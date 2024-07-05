import { Router } from "express";
//Router para crear las diferentes rutas

import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controllers.js"; //no olvidar el punto .js en mis modulos

//middleware
import { authRequired } from "../middlewares/validateToken.js";
import { validatorSchema } from "../middlewares/validatorMiddleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

//Authenticacion
router.post("/register", validatorSchema(registerSchema), register);
router.post("/login", validatorSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile); //para acceder a esta ruta debe pasar por un middleware que verifique si el usuario es valido para acceder a la ruta

export default router;
