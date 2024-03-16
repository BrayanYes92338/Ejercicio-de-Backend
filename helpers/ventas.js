import ventas from '../models/ventas.js'

const helpersventas ={
    validarventunica: async (descripcion) => {
        const existe = await ventas.findOne({descripcion})
        if(existe){
            throw new Error('La venta ya ha sido registrada')
        }
    },
    validarexitaventaID:async (id)=> {
        const existe = await ventas.findById(id)
        if(existe == undefined){
            throw new Error(`Id de la venta no existe`)
        }
    }
}

export default helpersventas;