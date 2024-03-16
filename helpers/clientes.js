import clientes from '../models/clientes.js'

const helpersClientes ={
   validarcorreounico:async (descripcion) => {
    const existe = await clientes.findOne({descripcion})
    if(existe){
        throw new Error('El correo ya esta registrado')
    }
   },
    validarExistaClienteId:async (id)=>{
     const existe = await clientes.findById(id)
     if (existe==undefined){
          throw new Error ("Id no existe")
     }
}
}

export default helpersClientes ;