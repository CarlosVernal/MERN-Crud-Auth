//npm i express morgan -> morgan (middleware)para registra informacion detallada de las solicitudes HTTP sobre cada solicitud que recive el servidor y exprees para realziar el ruteo de la aplicacion web.
import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());

//rutas
app.use("/api", authRoutes); // /api -> todas las rutas que accedan al backEnd

export default app;
