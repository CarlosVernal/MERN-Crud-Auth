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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }); //encuentra un usuario en la DB con ese correo
    if (!userFound) return res.status(400).json({ message: "User Not Found" }); //en caso de que no exista

    const passMatch = await bcryptjs.compare(password, userFound.password); //Compara las contraseñas (true/flase)
    if (!passMatch)
      return res.status(400).json({ message: "Incorrect Password" });

    // Tambien se podria simplemente decir credenciales no validas para brindar mas seguridad

    const token = await createAccessToken({ id: userFound._id }); // se crea un token

    res.cookie("token", token); //establece el token en una cookie para pasarla al frontEnd
    res.json({
      //envio de datos del usuario creado al frontEnd
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { //genera un token vacio
    expires: new Date(0), //establece una fecha pasada por lo que el navegador elimina la cookie
  });
  return res.sendStatus(200);
};
