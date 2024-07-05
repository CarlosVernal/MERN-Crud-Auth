import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Es necesario instanciar
    username: {
      type: String, //tipo de dato
      require: true, // campo obligatorio
      trim: true, // limpia los espacio al principio y al final
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true, //este campo debe ser unico en la coleccion
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
// esto es el equivalente a crear una tabla en una base de datos realacionada (como MySql u otro)
