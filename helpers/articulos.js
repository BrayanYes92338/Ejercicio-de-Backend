import Articulo from "../models/articulos.js"

const helpersArticulos ={
    validarArticuloUnico:async (descripcion)=>{
        const existe = await Articulo.findOne({descripcion})
        if (existe){
            throw new Error ("Articulos ya Existe")
        }
        
    },
   
    validarExistaId:async (id)=>{
        const existe = await Articulo.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    }
  


};

export default helpersArticulos;