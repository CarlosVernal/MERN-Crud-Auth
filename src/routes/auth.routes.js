import { Router } from "express";
//Router para crear las diferentes rutas

import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controllers.js"; //no olvidar el punto .js en mis modulos
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

//Authenticacion
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",authRequired, profile); //para acceder a esta ruta debe pasar por un middleware que verifique si el usuario es valido para acceder a la ruta

export default router;
