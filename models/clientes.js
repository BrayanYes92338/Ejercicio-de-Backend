import mongoose from "mongoose";

const ClientesSchema = new mongoose.Schema({
nombre:{type: String, require: true, minlength: 4},
dirrecion: {type: String, require: true},
correo:{type:String, require: true, unique: true},
fecha:{type:Date, default:Date.now},
estado: {type:Number,default:1}

})


export default mongoose.model("Cliente", ClientesSchema)