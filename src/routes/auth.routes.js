import { Router } from "express";
//Router para crear las diferentes rutas

import { register, login } from "../controllers/auth.controllers.js"; //no olvidar el punto .js en mis modulos
// importar las funciones asociadas a las rutas
const router = Router();

//para Authenticacion
router.post("/register", register);
router.post("/login", login);

export default router;
