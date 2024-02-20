import mongoose from "mongoose";

const articuloSchema=new mongoose.Schema({
    idcategoria:{type:mongoose.Schema.Types.ObjectId,ref:'Categoria',required:true},
    nombre:{type:String,default:"",minlength: 4, require:true},
    precio:{type:Number,default:0}, 
    stock:{type:Number,default:0},
    estado:{type:Number,default:1},
    createAt:{type:Date,default:Date.now},
})

export default mongoose.model("Articulo",articuloSchema)