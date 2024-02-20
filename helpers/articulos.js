import Articulo from "../models/articulos.js"




const helpersArticulos ={
    validarArticuloUnico:async (descripcion)=>{
        const existe = await Articulo.findOne({descripcion})
        if (existe){
            throw new Error ("Articulos ya Existe")
        }
        
    },
   

  


};

export default helpersArticulos;