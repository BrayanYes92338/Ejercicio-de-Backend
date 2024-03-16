import Ventas from "../models/ventas.js";
import Articulos from "../models/articulos.js"

const httpVentas = {

    getVentas: async (req, res) => {
        const { busqueda } = req.query;
        const venta = await Ventas.findById({
            $or: [{ numero: new RegExp(busqueda, "i") }],
        })
        res.json({ venta });
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
            const { idcliente, numero, createAT, estado, detalle, descuento, iva, subtotal, total } = req.body;
            const venta = new Ventas({ idcliente, numero, createAT, estado, detalle, descuento, iva, subtotal, total });
            await venta.save();
            let acumulador = 0;
            for (i = 0; i < detalle.length; i++) {
                const articulo = await Articulos.findById(detalle[i].idarticulo)
                const resultado = articulo.stock - detalle[i].cantidad
                if (articulo.stock > 0) {
                    const data = await Articulos.findByIdAndUpdate(detalle[i].idarticulo, { stock: resultado })
                } else {
                    return res.status(200).json({ message: `El articulo ${articulo.nombre} ya no tiene stock` })

                }
                const total = detalle[i].precio * detalle[i].cantidad
                const descuento = total * 10 / 100
                const iva = total * 11 / 100
                const descuentoTotal = total - descuento
                const totalFinal = descuentoTotal + iva
                acumulador += totalFinal
                const dataventa = await Ventas.findByIdAndUpdate(venta._id, {
                    descuento: descuento,
                    iva: iva,
                    subtotal: descuentoTotal,
                    total: acumulador
                })

            }
        } catch (error) {
            res.status(400).json({ err: "No se pudo crear el articulo" })

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


};

export default httpVentas;