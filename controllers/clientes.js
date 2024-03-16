import Cliente from "../models/clientes.js"

const httpClientes = {

    getCliente: async (req, res) => {
        const { busqueda } = req.query;
        const cliente = await Cliente.find({
            $or: [{ nombre: new RegExp(busqueda, "i") }],
        });
        res.json({ cliente });
    },getClienteID: async (req, res)=>{
        const {id} = req.params;
        const clientes =  await Cliente.findById(id);
        res.json({clientes});
    },
    postCliente: async (req, res) => {
        try {
            const { nombre, direccion, correo } = req.body;
            const cliente = new Cliente({ nombre, direccion, correo });
            await cliente.save();
            res.json({ cliente });
        } catch (error) {
            res.status(400).json({ err: "No se pudo crear el cliente" });
        }
    },
    putCliente: async (req, res) => {
        const {id} = req.params;
        const {createAt, correo, dirrecion, estado, ...resto} = req.body;
        const cliente = await Cliente.findByIdAndUpdate(id,resto, {new:true})
        res.json({ cliente });
    },
    putClienteActivar: async (req, res) => {
        const {id} = req.params;
        const cliente = await  Cliente.findbyUpdate(
        id, {estado: 1}, 
        {new:true}) ;
        res.json({cliente})

    },
    putClienteDesactivar: async (req, res) => {
        const {id} = req.params;
        const cliente = await  Cliente.findbyUpdate(
        id, {estado: 0}, 
        {new:true}) ;
        res.json({cliente})

    },
    deleteCliente: async (req, res) => {
        const {id} = req.params;
        const resultado = await Cliente.findByIdAndDelete(id);
        res.json({ resultado})
    }


}

export default httpClientes;