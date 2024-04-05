import Articulos from "../models/articulos.js"
const helpersArticulos={
    validarArticuloUnica:async (descripcion)=>{
        const existe = await Articulos.findOne({descripcion})
        if (existe){
            throw new Error ("Articulo Existe")
        }
    },
    validarExistaArticulosId:async (id)=>{
        const existe = await Articulos.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    }
}

export default helpersArticulos