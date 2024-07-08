import { readBody, defineEventHandler } from 'h3';
import nodemailer from 'nodemailer';
import { useRuntimeConfig } from '#imports';

interface RequestBody {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  botField?: string; // Campo honeypot
  startTime?: string; // Tiempo de inicio
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RequestBody>(event);
  const { name, email, company, phone, message, botField, startTime } = body;

  console.log('Request body:', body);

  if (!name || !email) {
    console.log('Missing required fields.');
    return {
      success: false,
      message: 'Nombre y correo son requeridos'
    };
  }

  // Verificación del campo honeypot
  if (botField) {
    console.log('Bot detected via honeypot.');
    return {
      success: false,
      message: 'Bot detected!'
    };
  }

  // Verificación del tiempo de sumisión del formulario
  const duration = new Date().getTime() - Number(startTime);
  console.log('Submission duration:', duration);
  if (duration < 3000) { // Ajusta el tiempo mínimo según sea necesario
    console.log('Bot detected due to quick submission.');
    return {
      success: false,
      message: 'Bot detected! Submission too quick.'
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

  const config = useRuntimeConfig();
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
    console.log('Sending email with options:', mailOptions);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
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
