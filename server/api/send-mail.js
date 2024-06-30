import { readBody, defineEventHandler } from 'h3';
import nodemailer from 'nodemailer';
import { $fetch } from 'ohmyfetch';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, company, phone, message, recaptcha } = body;

  console.log('Received form data:', body);

  if (!name || !email) {
    return {
      success: false,
      message: 'Nombre y correo son requeridos'
    };
  }

  // Verificar el token de reCAPTCHA
  const config = useRuntimeConfig();
  const recaptchaSecret = config.private.recaptchaSecretKey;
  const recaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

  try {
    const recaptchaResponse = await $fetch(recaptchaVerificationUrl, {
      method: 'POST',
      params: {
        secret: recaptchaSecret,
        response: recaptcha
      }
    });

    console.log('reCAPTCHA verification response:', recaptchaResponse);

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
      message: 'Error verificando reCAPTCHA: ' + error.message
    };
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.public.mailRecipient,
    subject: `FORMULARIO WEB | ${company}`,
    html: `Nombre: ${name}<br>Email: ${email}<br>Empresa: ${company}<br>Teléfono: ${phone}<br>Mensaje: ${message}`,
    replyTo: email
  };

  if (process.env.NODE_ENV === 'development') {
    // Usar nodemailer con MailHog en desarrollo
    const transporter = nodemailer.createTransport({
      host: process.env.MAILHOG_HOST,
      port: process.env.MAILHOG_PORT,
    });

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return {
        success: true,
        message: '¡El formulario ha sido enviado correctamente! 🥳🎉'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: `Error al enviar el correo: ${error.message}`
      };
    }
  } else {
    // Usar nuxt-mail en producción
    try {
      const { mail } = useNitroApp().$mail;
      await mail.send(mailOptions);
      console.log('Email sent successfully');
      return {
        success: true,
        message: '¡El formulario ha sido enviado correctamente! 🥳🎉'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: `Error al enviar el correo: ${error.message}`
      };
    }
  }
});
