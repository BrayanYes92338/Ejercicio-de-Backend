import Compras from "../models/compras.js";
import Articulos from "../models/articulos.js";

const httpCompras = {
    getCompras: async (req, res) =>{
        const {busqueda} = req.query;
        const compra = await Compras.find({
            $or: [{ numero: new RegExp(busqueda, "i") }]
        });
        res.json({compra})
    },
    getComprasID: async (req, res) =>{
        const { id } = req.params;
        const compra = await Compras.findById(id);
        res.json({ compra })
    },
    getComprasPopulate: async (req, res) =>{
        const { id } = req.params;
        const compra = await Compras.findById(id)
        .populate({
            path:"idproveedor"
        })
        res.json({ compra })
    },
    postCompras: async (req, res) => {
        try {
          const { idproveedor, numero, createAt, estado, detalle, descuento, iva, subtotal, total} = req.body;
          const compra = new Compras({idproveedor, numero, createAt, estado, detalle, descuento, iva, subtotal, total});
          await compra.save();
          let acum = 0
          for (let i = 0; i < detalle.length; i++) {
            const articulo = await Articulos.findById(detalle[i].idarticulo)
            const result = parseInt(articulo.stock) + parseInt(detalle[i].cantidad)
            if ( parseInt(detalle[i].cantidad) > 0) {
              const data = await Articulos.findByIdAndUpdate(detalle[i].idarticulo, {stock:result})
            }else{
              
             return res.status(400).json({ message: `El articulo ${articulo.nombre} no se pudo agregar` })
            }
    
            const total = detalle[i].precio * detalle[i].cantidad
            const desc = total * 20/100
            const iva = total * 11/100
            const descuento = total - desc
            const totalfin = descuento + iva
            acum += totalfin 
            console.log(totalfin);
            const datacompra = await Compras.findByIdAndUpdate(compra._id, {
              descuento: desc,
              iva: iva,
              subtotal: descuento,
              total: acum
            })
          }
          res.json({ compra });
        } catch (error) {
          res.status(400).json({err: "No se pudo realizar la compra"})
      }
    },
}

export default httpCompras;