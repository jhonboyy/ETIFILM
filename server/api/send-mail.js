import axios from 'axios';

export default async function (req, res) {
  const { name, email, company, phone, message, recaptcha } = req.body;

  console.log('Received form data:', req.body);

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Nombre y correo son requeridos' });
  }

  // Verificar el token de reCAPTCHA
  const recaptchaSecret = process.env.VUE_APP_RECAPTCHA_SECRET_KEY;
  const recaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptcha}`;

  try {
    const recaptchaResponse = await axios.post(recaptchaVerificationUrl);
    console.log('reCAPTCHA verification response:', recaptchaResponse.data);

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ success: false, message: 'Error de verificación de reCAPTCHA' });
    }
  } catch (error) {
    console.error('Error during reCAPTCHA verification:', error);
    return res.status(500).json({ success: false, message: 'Error verificando reCAPTCHA: ' + error.message });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    subject: `FORMULARIO WEB | ${company}`,
    html: `Nombre: ${name}<br>Email: ${email}<br>Empresa: ${company}<br>Teléfono: ${phone}<br>Mensaje: ${message}`,
    replyTo: email
  };

  try {
    const mail = useNuxtApp().$mail;
    await mail.send(mailOptions);
    console.log('Email sent successfully');
    res.json({ success: true, message: '¡El formulario ha sido enviado correctamente! 🥳🎉' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: `Error al enviar el correo: ${error.message}` });
  }
}
