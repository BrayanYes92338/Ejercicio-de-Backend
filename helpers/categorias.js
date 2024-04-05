import Categoria from "../models/categorias.js"
const helpersCategorias={
    validarCategoriaUnica:async (descripcion)=>{
        const existe = await Categoria.findOne({descripcion})
        if (existe){
            throw new Error ("Categoria Existe")
        }
    },
    validarExistaCategoriaId:async (id)=>{
        const existe = await Categoria.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    }
}

export default helpersCategorias