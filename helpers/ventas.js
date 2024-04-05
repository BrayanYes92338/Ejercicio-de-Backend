import Ventas from "../models/ventas.js"
const helpersVentas={
    validarVentaUnica:async (numero)=>{
        const existe = await Ventas.findOne({numero})
        if (existe){
            throw new Error (" Numero de Venta Existente")
        }
    },
    validarExistaVentasId:async (id)=>{
        const existe = await Ventas.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    }
}

export default helpersVentas 