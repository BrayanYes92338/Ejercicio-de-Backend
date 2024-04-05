import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    nombre:{type:String, required: true, minlength:4},
    createAt:{type:Date,default:Date.now},
    correo:{type:String, required:true, unique:true},
    empresa:{type:String, required:true},
    estado:{type:Number, default:1},
})

export default mongoose.model("Proveedor",proveedorSchema)