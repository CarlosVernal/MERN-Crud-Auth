import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; //Modulo para encriptar contraseñas
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email already exist"]);

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
    if (!userFound) return res.status(400).json(["User Not Found"]); //en caso de que no exista

    const passMatch = await bcryptjs.compare(password, userFound.password); //Compara las contraseñas (true/flase)
    if (!passMatch) return res.status(400).json(["Incorrect Password"]);

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
  res.cookie("token", "", {
    //genera un token vacio
    expires: new Date(0), //establece una fecha pasada por lo que el navegador elimina la cookie
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id); //busqueda del usuario en base de datos segun id extraida del token validado

  if (!userFound) return res.status(400).json(["User not Found"]); //en caso de no encontrar un usuario valido

  res.json({
    //envio de datos del usuario al front
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

//funcion solicitada desde el frontEnd para verificar cookies, si no es valida o no existe envia mensaje de error
export const verifyToken = async (req, res) => {
  const { token } = req.cookies; //extra el token de la cookie

  if (!token) return res.status(401).json({ message: "Unauthorized" }); //no existe

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    //si existe comprueba que sea valida
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await User.findById(user.id); //si existe extrae la id y la busca en la base de datos y compara
    if (!userFound) return res.status(401).json({ message: "Unauthorized" }); // si la id extraida no corresponde a ningun usuario existente envia error

    return res.json({ //si es valida envia los datos del usuario
      id: userFound.id,
      email: userFound.email,
      username: userFound.username,
    });
  });
};
