import { readBody, defineEventHandler, getRequestHeaders } from 'h3';
import nodemailer from 'nodemailer';
import { useRuntimeConfig } from '#imports';

// Almacena la frecuencia de envíos (esto es solo para la sesión actual)
const rateLimitMap = new Map();

interface RequestBody {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  botField?: string; // Campo honeypot
  startTime?: string; // Tiempo de inicio
  randomField?: object; // Campos aleatorios
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RequestBody>(event);
  const { name, email, company, phone, message, botField, startTime, randomField } = body;
  const headers = getRequestHeaders(event);
  const clientIp = headers['x-forwarded-for'] || headers['remote_addr'] || 'unknown';

  // Configuración para rate limiting (limitar a 3 envíos en 15 minutos por IP)
  const rateLimit = {
    maxRequests: 3,
    windowMs: 15 * 60 * 1000, // 15 minutos
  };

  // 1. Rate Limiting
  const currentTime = Date.now();
  if (rateLimitMap.has(clientIp)) {
    const { requests, timestamp } = rateLimitMap.get(clientIp);
    if (requests >= rateLimit.maxRequests && currentTime - timestamp < rateLimit.windowMs) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return { success: false, message: 'Demasiados intentos de envío, intenta más tarde.' };
    }
    // Incrementa el conteo si está dentro del tiempo
    if (currentTime - timestamp < rateLimit.windowMs) {
      rateLimitMap.set(clientIp, { requests: requests + 1, timestamp });
    } else {
      // Reinicia el conteo después del tiempo
      rateLimitMap.set(clientIp, { requests: 1, timestamp: currentTime });
    }
  } else {
    rateLimitMap.set(clientIp, { requests: 1, timestamp: currentTime });
  }

  console.log('Request body:', body);

  // 2. Validación del campo honeypot
  if (botField) {
    console.log('Bot detected via honeypot.');
    return { success: false, message: 'Bot detected!' };
  }

  // 3. Validación del tiempo de sumisión del formulario
  const duration = currentTime - Number(startTime);
  console.log('Submission duration:', duration);
  if (duration < 3000) {
    console.log('Bot detected due to quick submission.');
    return { success: false, message: 'Bot detected! Submission too quick.' };
  }

  // 4. Validación de los campos aleatorios
  if (!randomField || typeof randomField !== 'object') {
    console.log('Missing random field validation.');
    return { success: false, message: 'Error en los datos del formulario.' };
  }

  // 5. Configuración de Nodemailer para envío de correo
  let mailOptions: nodemailer.SendMailOptions = {
    from: '',
    to: '',
    subject: '',
    html: '',
    replyTo: ''
  };
  let transporter: nodemailer.Transporter = nodemailer.createTransport({});
  const config = useRuntimeConfig();
  const mailMode = process.env.MAIL_MODE

  if (mailMode === 'maildev') {
    transporter = nodemailer.createTransport({
      host: '127.0.0.1',
      port: 1025,
    } as nodemailer.TransportOptions);
    mailOptions = {
      from: `"${name}" <${email}>`,
      to: "recipient@example.com",
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
      from: `"${name}" <${config.private.gmailUser}>`,
      to: config.private.gmailUser,
      subject: `FORMULARIO WEB | ${company}`,
      html: `Nombre: ${name}<br>Email: ${email}<br>Empresa: ${company}<br>Teléfono: ${phone}<br>Mensaje: ${message}`,
      replyTo: email
    };
  }

  try {
    console.log('Sending email with options:', mailOptions);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
    return { success: true, message: '¡El formulario ha sido enviado correctamente! 🥳🎉' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: `Error al enviar el correo: ${(error as Error).message}` };
  }
});
