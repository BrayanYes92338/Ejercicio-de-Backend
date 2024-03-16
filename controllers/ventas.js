import Ventas from "../models/ventas.js";
import Articulos from "../models/articulos.js"

const httpVentas = {

    getVentas: async (req, res) => {
        const {busqueda} =req.query;
        const cliente = await Ventas.find({
            $or: [{numero: new RegExp(busqueda, "i")}]
        })
        res.json({cliente});
    },
    getVentasID: async (req, res) => {
        const { id } = req.params;
        const ventas = await Ventas.findById(id);
        res.json({ ventas });
    },
    getVentaspopulate: async (req, res) => {
        const { id } = req.params;
        const venta = await Ventas.findById(id)
            .populate({
                path: "idcliente"
            })
        res.json({ venta });
    },
    postVentas: async (req, res) => {
        try {
            const { idcliente, numero, detalle, descuento, iva } = req.body;
    
            const ventaExistente = await Ventas.findOne({ numero });
            if (ventaExistente) {
                return res.status(400).json({ message: 'Ya existe una venta con este número' });
            }
    
            if (!detalle || detalle.length === 0) {
                return res.status(400).json({ message: 'El detalle de la venta es requerido y debe contener al menos un artículo' });
            }
    
            if (descuento === 0 || iva === 0 || !descuento || !iva) {
                return res.status(400).json({ message: 'El descuento y el IVA son requeridos y no pueden ser cero' });
            }
    
            let acumulador = 0;
            let ivaTotal = 0;
    
            for (let i = 0; i < detalle.length; i++) {
                const articulo = await Articulos.findById(detalle[i].idarticulo);
                if (!articulo) {
                    return res.status(400).json({ message: `El artículo con ID ${detalle[i].idarticulo} no existe` });
                }
    
                if (articulo.stock < detalle[i].cantidad) {
                    return res.status(400).json({ message: `El artículo ${articulo.nombre} no tiene suficiente stock` });
                }
    
                const total = detalle[i].precio * detalle[i].cantidad;
                const descuentoTotal = total * (descuento / 100);
                ivaTotal += total * (iva / 100);
                const totalFinal = total - descuentoTotal + (total * (iva / 100));
                acumulador += totalFinal;
            }
    
            if (acumulador === 0 || ivaTotal === 0) {
                return res.status(400).json({ message: 'El subtotal y el IVA total no pueden ser cero' });
            }
    
            const venta = new Ventas({ idcliente, numero, detalle, descuento, iva });
            await venta.save();
    
            await Ventas.findByIdAndUpdate(venta._id, {
                subtotal: acumulador - ivaTotal,
                total: acumulador
            });
    
            res.status(201).json({ message: 'Venta creada exitosamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
        }
    },
    putVentas: async (req, res)=>{
        const {id} =req.params;
        const {idcliente, numero, createAT, estado, detalle, descuento, iva, subtotal, total, ...resto} = req.body;
        const venta = await Ventas.findByIdAndUpdate(id,resto,{new:true});
        res.json({venta});

    },
    putVentasActivar: async (req, res)=>{
        const {id} =req.params;
        const venta = await Ventas.findByIdAndUpdate(id,{estado:1},{new:true});
        res.json({venta});
    },
    putVentasDesactivar: async (req, res)=>{
        const {id} =req.params;
        const venta = await Ventas.findByIdAndUpdate(id,{estado:0},{new:true});
        res.json({venta});
    },
    deleteVentas: async (req, res)=>{
        const {id}= req.params;
        const resultado = await Ventas.findByIdAndDelete(id);
        res.json({resultado});  
    }

};

export default httpVentas;