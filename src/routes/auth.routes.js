import { Router } from "express";
//Router para crear las diferentes rutas

import { register, login, logout } from "../controllers/auth.controllers.js"; //no olvidar el punto .js en mis modulos

const router = Router();

//Authenticacion
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
