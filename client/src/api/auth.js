//peticiones hacia el backEnd
import axios from "axios"; //biblioteca que usa fetch
//ruta del backEnd
const API = "http://localhost:3000/api";
//envia los datos de req.body o Values capturados en el formulario (username,email,password) al backEnd a la ruta register en controllers/auth.controllers.js -> register
export const registerRequest = (user) => axios.post(`${API}/register`, user);

export const loginRequest = (user) => axios.post(`${API}/login`, user);
