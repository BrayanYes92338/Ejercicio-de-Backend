import Ventas from "../models/ventas.js";
import Articulos from "../models/articulos.js";


const httpVentas = {
  getVentas: async (req, res) => {
  const {busqueda} = req.query;
  const  venta = await Ventas.find({
    $or: [{ numero: new RegExp(busqueda, "i") }],
  });
  res.json({ venta })
  }, 
  getVentasID: async (req, res) => {
    const { id } = req.params;
    const ventas = await Ventas.findById(id);
    res.json({ ventas });
  },
  getVentasPopulate: async (req, res) => {
    const { id } = req.params;
    const venta = await Ventas.findById(id)
    .populate({
      path:"idcliente"
    })
  res.json({ venta }) 
    },

  postVentas: async (req, res) => {
    try {
      const { idcliente, numero, createAt, estado, detalle, descuento, iva, subtotal, total} = req.body;
      const venta = new Ventas({idcliente, numero, createAt, estado, detalle, descuento, iva, subtotal, total});
      await venta.save();
      let acum = 0
      for (let i = 0; i < detalle.length; i++) {
        const articulo = await Articulos.findById(detalle[i].idarticulo)
        const result = articulo.stock-detalle[i].cantidad
        if (articulo.stock > 0) {
          const data = await Articulos.findByIdAndUpdate(detalle[i].idarticulo, {stock:result})
        }else{
          
         return res.status(200).json({ message: `El articulo ${articulo.nombre} ya no tiene stock` })
        }

        const total = detalle[i].precio * detalle[i].cantidad
        const desc = total * 10/100
        const iva = total * 11/100
        const descuento = total - desc
        const totalfin = descuento + iva
        acum += totalfin 
        console.log(totalfin);
        const dataventa = await Ventas.findByIdAndUpdate(venta._id, {
          descuento: desc,
          iva: iva,
          subtotal: descuento,
          total: acum
        })
      }
      res.json({ venta });
    } catch (error) {
      res.status(400).json({err: "No se pudo crear la venta"})
  }
},
  putVentas: async (req,res) =>{
    const { id } = req.params;
    const { idcliente, numero, createAt, detalle, descuento, iva, subtotal, total, ...resto } = req.body;
    const venta = await Ventas.findByIdAndUpdate(id, resto, {new: true});
    res.json({ venta });
  },
  putVentasDesactivar: async (req, res) => {
    const { id } = req.params;
    const venta = await Ventas.findByIdAndUpdate(
      id,
      { estado: 0 },
      { new: true }
    );
    res.json({ venta });
  },
  putVentasActivar: async (req, res) => {
    const { id } = req.params;
    const venta = await Ventas.findByIdAndUpdate(
      id,
      { estado: 1 },
      { new: true }
    );
    res.json({ venta });
  },
} 




export default httpVentas;