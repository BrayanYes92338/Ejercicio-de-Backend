import Usuario from "../models/usuario.js";

const helpersUsuario={
    validarUsuarioUnico:async (correo)=>{
        const existe = await Usuario.findOne({correo})
        if (existe){
            throw new Error ("Este correo ya existe")
        }
    },
    validarExistaUsuarioId:async (id)=>{
        const existe = await Usuario.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    },
    noexisteCorreo:async(correo)=>{
        if(correo){
            const existe=await Usuario.findOne({correo})
            if(!existe) throw new Error("Correo no existe Base de datos")
        }
    },
}

export default helpersUsuario