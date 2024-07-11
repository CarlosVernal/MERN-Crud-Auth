//peticiones hacia el backEnd
import axios from "./axios.js"; //biblioteca que usa fetch
//ruta del backEnd

//envia los datos de req.body o Values capturados en el formulario (username,email,password) al backEnd a la ruta register en controllers/auth.routes.js -> register
export const registerRequest = (user) => axios.post("/register", user);

export const loginRequest = (user) => axios.post("/login", user);

//peticion de verificacion al backEnd en auth.routes.js
export const verifyTokenRequest = (user) => axios.get("/verify") 