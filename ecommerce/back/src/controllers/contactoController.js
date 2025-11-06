import nodemailer from 'nodemailer';

export const enviarCorreo = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // 👈 ignora certificados autofirmados
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'joanaromay@gmail.com',
      subject: `Nuevo mensaje de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje:\n${mensaje}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ message: 'Error enviando el correo' });
  }
};
