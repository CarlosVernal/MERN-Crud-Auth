//mongoose para modelar y validar la informacion que sera enviada a la base de datos
import mongoose from "mongoose";
//mongo db crea una base de datos cuando se le ingresa el primer valor
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/merndb");//merndb es el nombre de la base de datos que sera creada
    console.log('DB is connected')
  } catch (error) {
    console.log(error);
  }
};
