import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
// funcion que permite protejer rutas de usuarios validados
export const authRequired = (req, res, next) => {
  const { token } = req.cookies; //extraccion del token
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => { //comprobacion, se extrae el id del token utilizando la clave secreta
    if (err) return res.status(403).json({ message: "Invalid Token" });
    
    req.user = user;
    next(); //permite proceder a la ruta
  });
};
