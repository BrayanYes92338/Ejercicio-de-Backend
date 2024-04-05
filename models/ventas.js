import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  idcliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente',required:true,  },
  numero:{type:String,required:true, unique:true},
  createAt:{type:Date,default:Date.now},
  estado:{type:Number,default:1},
  detalle:[{
    idarticulo:{type:mongoose.Schema.Types.ObjectId,ref:'Articulo',required:true,
     },
    precio:{type:Number,default:0},
    cantidad:{type:Number,default:0},
  }],
  descuento:{type:Number,default:0},
  iva:{type:Number,default:0},
  subtotal:{type:Number,default:0},
  total:{type:Number,default:0}
})

export default mongoose.model("Venta",ventaSchema) 