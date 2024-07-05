import express from "express";
import morgan from "morgan"; //detalles de peticiones HTTP
import cookieParser from "cookie-parser"; // uso de cookies

//importar rutas
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//rutas
app.use("/api", authRoutes); // /api -> todas las rutas que accedan al backEnd
app.use("/api", tasksRoutes);

export default app;
