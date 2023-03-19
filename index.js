const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const validator = require('email-validator');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

app.post('/send-email', async (req, res, next) => {
  const { to, subject, text } = req.body;

  if (!validator.validate(to)) {
    return res.status(400).json({ error: 'Dirección de correo electrónico inválida' });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fordezdeveloper@gmail.com',
      pass: 'vznkyoiqtzytfvpy'
    }
  });

  const mailOptions = {
    from: 'fordezdeveloper@gmail.com',
    to,
    subject,
    text
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'ok', result });
  } catch (error) {
    return next(error);
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado en http://localhost:8080');
});
