const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config({ path: './.env' });
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined')); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, 
});
app.use(limiter);

const port = process.env.PORT || 3000;
const domains = [process.env.ALLOWED_DOMAIN_1, process.env.ALLOWED_DOMAIN_2, process.env.ALLOWED_DOMAIN_3];

const corsOptions = {
  origin: domains,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para enviar correos
app.post('/send', [
  body('name').notEmpty().withMessage('Nombre requerido'),
  body('email').isEmail().withMessage('Formato de email inválido'),
  body('token').notEmpty().withMessage('Token requerido'),
  body('company').optional().isString(),
  body('phone').optional().isNumeric().withMessage('Formato de teléfono inválido'),
  body('message').optional().isLength({ min: 1 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  // Datos del formulario
  const { name, email, company, phone, message, token } = req.body;

  try {
    // Verificación reCAPTCHA
    const recaptchaResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
          secret: process.env.VUE_APP_RECAPTCHA_SECRET_KEY,
          response: token
      }
    });

    if (!recaptchaResponse.data.success || (recaptchaResponse.data.score ?? 0) < 0.5) {
      console.log('Fallo en la verificación de reCAPTCHA');
      return res.status(400).json({ success: false, message: 'Verification failed.' });
    }

    // Configuración del transportador de correo
    let transporter;
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        ignoreTLS: true 
      });
    } else {
      transporter = nodemailer.createTransport({
        host: 'smtp.resend.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.RESEND_USER,
          pass: process.env.RESEND_PASS,
        }
      });
    }

    // Opciones de correo
    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_RECIPIENT,
      subject: 'FORMULARIO WEB | Nuevo mensaje',
      html: `Nombre: ${name}<br>Email: ${email}<br>Empresa: ${company}<br>Teléfono: ${phone}<br>Mensaje: ${message}`,
      replyTo: email
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: '¡El formulario ha sido enviado correctamente! 🥳🎉' });
  } catch (error) {
    console.log('Error al enviar el correo:', error.message);
    res.status(500).json({ success: false, message: 'Error al enviar el correo: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
