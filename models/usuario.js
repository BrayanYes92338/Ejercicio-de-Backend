import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre:{type:String,required:true,minlength:4},
  correo:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  estado:{type:Number, default:1},
})

export default mongoose.model("Usuario",usuarioSchema)
