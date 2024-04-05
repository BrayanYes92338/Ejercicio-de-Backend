import Cliente from "../models/clientes.js";

const httpClientes = {

  getClientes: async (req, res) => {
    const { busqueda } = req.query;
    const cliente = await Cliente.find({
      $or: [{ nombre: new RegExp(busqueda, "i") }],
    });
    res.json({ cliente }); 
  },
  getClientesID: async (req, res) => {
    const { id } = req.params;
    const clientes = await Cliente.findById(id);
    res.json({ clientes });
  },
  postClientes: async (req, res) => {
    try {
    const { nombre, correo, direccion } = req.body;
    const cliente = new Cliente({nombre, correo, direccion});
    await cliente.save();
    res.json({ cliente });
    }catch (error){
      res.status(400).json({ err: "No se pudo crear el cliente" });
    }
  },
  putClientes: async (req, res) => {
    const { id } = req.params;
    const { createAt, correo, direccion, estado, ...resto} = req.body;
    const cliente = await Cliente.findByIdAndUpdate(id, resto, {new: true});
    res.json({ cliente })
  },
  putClientesActivar: async (req,res) =>{
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({ cliente });
  },
  putClientesDesactivar: async (req,res) =>{
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, {estado: 0}, {new: true});
    res.json({ cliente });
  },
  deleteClientes: async (req, res) => {
    const { id } = req.params;
    const result = await Cliente.findByIdAndDelete(id);
    res.json({ result });
  },

}

export default httpClientes;