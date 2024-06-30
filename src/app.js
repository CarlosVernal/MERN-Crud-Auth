//npm i express morgan -> morgan (middleware)para registra informacion detallada de las solicitudes HTTP sobre cada solicitud que recive el servidor y exprees para realziar el ruteo de la aplicacion web.
import express from "express";
import morgan from "morgan";


const app = express();

//middleware 
app.use(morgan("dev"));

export default app;
