import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String, //tipo de dato
      require: true, // campo obligatorio
      trim: true, // limpia los espacio al principio y al final
    },
    description: {
      type: String,
      require: true,
    },
    date: {
      //fecha en la que se crea la tarea
      type: Date,
      default: Date.now,
    },
    user: {
      //usuario al que pertenece la tarea
      type: mongoose.Schema.Types.ObjectId, //objeto de tipo id (id es un tipo de objeto unico, no es un string)
      ref: "User", //esta id de usuario esta almancenada en User
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
