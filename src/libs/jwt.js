import jwt from "jsonwebtoken"; //Modulo para generar tokens
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) { //para este caso solo se genera con la id de un usuario (idealmente deberia ser tambien con el rol del mismo)
  return new Promise((resolve, reject) => { 
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
