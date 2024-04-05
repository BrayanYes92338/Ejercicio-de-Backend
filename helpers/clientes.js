import Clientes from "../models/clientes.js"
const helpersClientes={
    validarCorreoUnica:async (correo)=>{
        const existe = await Clientes.findOne({correo})
        if (existe){
            throw new Error ("Correo existente")
        }
    },
    validarExistaClienteId:async (id)=>{
        const existe = await Clientes.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    }
}

export default helpersClientes