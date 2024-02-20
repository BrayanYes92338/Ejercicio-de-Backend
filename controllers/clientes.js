import Cliente from "../models/clientes.js"

const httpClientes = {

    getClientes: async (req, res) => {
        const { busqueda } = req.query;
        const cliente = await Cliente.find({
            $or: [{ nombre: new RegExp(busqueda, "i") }],
        });
        res.json({ cliente });
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
    deleteCliente: async (req, res) => {
        const {id} = req.params;
        const resultado = await Cliente.findByIdAndDelete(id);
        res.json({ resultado})
    }

}

export default httpClientes;