import mongoose from "mongoose";

const VentasSchema = new mongoose.Schema({
    idCliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', require: true },
    numero: {type:String,required:true, unique:true},
    createdAT: { type: Date, default: Date.now },
    estado: {type:Number, default:1},
    detalle: [{
        idArticulo: { type: mongoose.Schema.Types.ObjectId, ref: 'Articulo', require: true },
        precio: { type: Number, default: 0 },
        stock: { type: Number, default: 0 },

    }],
    descuento:{type:Number,default:0},
    iva:{type:Number,default:0},
    subtotal:{type:Number,default:0},
    total:{type:Number,default:0}
});

export default mongoose.model("Venta", VentasSchema)