import { readBody, defineEventHandler } from 'h3';
import nodemailer from 'nodemailer';
import { $fetch } from 'ohmyfetch';
import { useRuntimeConfig } from '#imports';

interface RequestBody {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  recaptcha: string;
}

interface RecaptchaResponse {
  success: boolean;
  [key: string]: any;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RequestBody>(event);
  const { name, email, company, phone, message, recaptcha } = body;

  if (!name || !email) {
    return {
      success: false,
      message: 'Nombre y correo son requeridos'
    };
  }

  // reCAPTCHA token
  const config = useRuntimeConfig();
  const recaptchaSecret = config.private.recaptchaSecretKey;
  const recaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

  try {
    const recaptchaResponse = await $fetch<RecaptchaResponse>(recaptchaVerificationUrl, {
      method: 'POST',
      params: {
        secret: recaptchaSecret,
        response: recaptcha
      }
    });

    if (!recaptchaResponse.success) {
      return {
        success: false,
        message: 'Error de verificación de reCAPTCHA'
      };
    }
  } catch (error) {
    console.error('Error during reCAPTCHA verification:', error);
    return {
      success: false,
      message: 'Error verificando reCAPTCHA: ' + (error as Error).message
    };
  }

  let mailOptions: nodemailer.SendMailOptions = {
    from: '',
    to: '',
    subject: '',
    html: '',
    replyTo: ''
  };
  let transporter: nodemailer.Transporter = nodemailer.createTransport({});

  const mailMode = process.env.MAIL_MODE || 'mailhog'; // Default to Mailhog if not specified

  if (mailMode === 'mailhog') {
    transporter = nodemailer.createTransport({
      host: config.private.mailhogHost || 'localhost',
      port: config.private.mailhogPort || 1025,
    } as nodemailer.TransportOptions);
    mailOptions = {
      from: `"${name}" <${email}>`, // Use provided email for Mailhog
      to: "recipient@example.com", // Example recipient for Mailhog
      subject: `FORMULARIO WEB | ${company}`,
      html: `Nombre: ${name}<br>Email: ${email}<br>Empresa: ${company}<br>Teléfono: ${phone}<br>Mensaje: ${message}`,
      replyTo: email
    };
  } else if (mailMode === 'gmail') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.private.gmailUser,
        pass: config.private.gmailPass,
      },
    });
    mailOptions = {
      from: `"${name}" <${config.private.gmailUser}>`, // Use authenticated Gmail address
      to: config.private.gmailUser, // Ensure this is a valid address for production
      subject: `FORMULARIO WEB | ${company}`,
      html: `Nombre: ${name}<br>Email: ${email}<br>Empresa: ${company}<br>Teléfono: ${phone}<br>Mensaje: ${message}`,
      replyTo: email
    };
  }

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: '¡El formulario ha sido enviado correctamente! 🥳🎉'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: `Error al enviar el correo: ${(error as Error).message}`
    };
  }
});
