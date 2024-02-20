import Venta from "../models/ventas.js";

const httpVentas = {

    getVentas: async (req, res)=>{
        const {busqueda}=req.query;
        const venta = await Venta.findById({
            $or:[{numero: new RegExp(busqueda, "i")}],
        })
        res.json({venta});
    },
    getVentasID: ()=>{
        const {id} = req.params;

    },
    postVentas: async (req,res)=>{
        try {
            const {idCliente,numero, createAt, estado, idArticulo, precio, stock, descuento, iva, subtotal,total}= req.body;
            const venta = new Venta({idCliente,numero, createAt, estado, idArticulo, precio, stock, descuento, iva, subtotal,total})
            await venta.save();
            res.json({venta})
        } catch (error) {
            res.status(401).json({err: "No se pudo crear el articulo"})
            
        }
    }
    

};

export default httpVentas;