import Proveedor from "../models/proveedor.js";

const helpersProveedor={
    validarCorreoUnico: async (correo) =>{
        const existe = await Proveedor.findOne({correo})
        if (existe){
            throw new Error ("Este correo ya existe")
        }
    },
    validarExistaProveedorID: async (id) =>{
        const existe = await Proveedor.findById(id)
        if(existe==undefined){
            throw new Error ("El Id no existe")
        }
    }
}

export default helpersProveedor