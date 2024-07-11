import express from "express";
import morgan from "morgan"; //detalles de peticiones HTTP
import cookieParser from "cookie-parser"; // uso de cookies
import cors from "cors";

//importar rutas
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

//middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //permite que otros dominios se comuniquen con el servidor (frontEnd en http://localhost:5173 y backEnd en 3000), credentials para establecer las cookies
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//rutas
app.use("/api", authRoutes); // /api -> todas las rutas que accedan al backEnd
app.use("/api", tasksRoutes);

export default app;
