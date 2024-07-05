import jwt from "jsonwebtoken"; //Modulo para generar tokens
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) { //para este caso solo se genera con la id de un usuario (idealmente deberia ser tambien con el rol del mismo)
  return new Promise((resolve, reject) => { 
    jwt.sign(
      payload, //objeto que contiene id
      TOKEN_SECRET, //clave secreta
      {
        expiresIn: "1h", //opciones varias
      },
      (err, token) => { //callback
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
