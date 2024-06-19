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
const domains = [process.env.ALLOWED_DOMAIN_1, process.env.ALLOWED_DOMAIN_2];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || domains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta GET en la raíz para verificar que el servidor está operando correctamente
app.get('/', (req, res) => {
  res.status(200).send('Bienvenido a la API de Etifilm');
});

app.use((req, res, next) => {
  console.log('Received request from origin:', req.origin);
  next();
});

// Configuración del transportador de correo
let transporter;
if (process.env.NODE_ENV === 'development') {
  transporter = nodemailer.createTransport({
    host: process.env.MAILHOG_HOST,
    port: process.env.MAILHOG_PORT,
    ignoreTLS: true
  });
} else {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Tu dirección de Gmail
      pass: process.env.GMAIL_APP_PASS // Contraseña de aplicación de Gmail
    }
  });
}

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

  const { name, email, company, phone, message, token } = req.body;

  const recaptchaResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
    params: {
      secret: process.env.VUE_APP_RECAPTCHA_SECRET_KEY,
      response: token
    }
  });

  if (!recaptchaResponse.data.success || (recaptchaResponse.data.score ?? 0) < 0.5) {
    console.log('Fallo en la verificación de reCAPTCHA:', recaptchaResponse.data);
    return res.status(400).json({ success: false, message: 'Verification failed.' });
  }

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.MAIL_RECIPIENT,
    subject: 'FORMULARIO WEB | Nuevo mensaje',
    html: `Nombre: ${name}<br>Email: ${email}<br>Empresa: ${company}<br>Teléfono: ${phone}<br>Mensaje: ${message}`,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.json({ success: true, message: '¡El formulario ha sido enviado correctamente! 🥳🎉' });
  } catch (error) {
    console.log('Error al enviar el correo:', error.message);
    res.status(500).json({ success: false, message: 'Error al enviar el correo: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
