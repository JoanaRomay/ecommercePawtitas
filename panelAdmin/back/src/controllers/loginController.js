import { Usuario} from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



//login normal con email y contraseña
export const loginAdmin = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password.trim();

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rolId: usuario.rolId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//login Google callback
export const loginGoogleCallback = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Usuario no autenticado" });

    const token = jwt.sign(
      { id: user.id, email: user.email, rolId: user.rolId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Redirigir al frontend con el token
res.redirect(`http://localhost:5173/google/callback?token=${token}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
