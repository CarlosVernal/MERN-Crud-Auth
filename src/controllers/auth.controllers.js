import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; //Modulo para encriptar contraseñas
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const passwordHash = await bcryptjs.hash(password, 10); //Convertir a un string aleatorio
    const newUser = new User({
      //Crea el usuario con la contraseña enciptada
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save(); // Guarda el usuario en DB y se deja una copia de los datos en userSaved
    const token = await createAccessToken({ id: userSaved._id }); // se crea un token

    res.cookie("token", token); //establece el token en una cookie para pasarla al frontEnd
    res.json({
      //envio de datos del usuario creado al frontEnd
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = (req, res) => res.send("login");
