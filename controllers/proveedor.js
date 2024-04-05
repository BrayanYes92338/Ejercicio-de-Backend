import Proveedor from "../models/proveedor.js";

const httpProveedor = {

    getProveedor: async (req,res) => {
        const { busqueda } = req.query;
        const proveedor = await Proveedor.find({
            $or: [{ nombre: new RegExp(busqueda, "i") },]
        });
        res.json({ proveedor })
    },
    getProveedorID: async (req,res) =>{
        const { id } = req.params;
        const proveedor = await Proveedor.findById(id);
        res.json({ proveedor })
    },
    postProveedor: async (req, res) =>{
        try {
            const { nombre, correo, empresa } = req.body;
            const proveedor = new Proveedor({ nombre,correo, empresa });
            await proveedor.save();
            res.json({ proveedor })
        }catch (error){
            res.status(400).json({ err: "No se pudo crear el proveedor" });
        }
    },
    putProveedor: async (req,res) =>{
        const { id } = req.params;
        const { createAt, correo, estado, ...resto} = req.body;
        const proveedor = await Proveedor.findByIdAndUpdate(id, resto, {new: true});
        res.json({ proveedor })
    },
    putActivarProveedor: async (req,res) =>{
        const { id } = req.params;
        const proveedor = await Proveedor.findByIdAndUpdate(id, {estado: 1}, {new: true});
        res.json({ proveedor }); 
    },
    putDesactivarProveedor: async (req,res) =>{
        const { id } = req.params;
        const proveedor = await Proveedor.findByIdAndUpdate(id, {estado: 0}, {new: true});
        res.json({ proveedor }); 
    },
    deleteProveedor: async (req, res) => {
        const { id } = req.params;
        const result = await Proveedor.findByIdAndDelete(id);
        res.json({ result });
      },
}

export default httpProveedor;