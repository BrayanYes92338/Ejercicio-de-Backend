import { generarJWT } from "../middleware/validar-jwt.js";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";



const httpUsuarios = {

  getUsuarios: async (req, res) => {
    const { busqueda } = req.query;
    const usuario = await Usuario.find({
      $or: [{ nombre: new RegExp(busqueda, "i") }],
    });
    res.json({ usuario }); 
  },
  getUsuariosID: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json({ usuario });
  },
  postUsuarios: async (req, res) => {
    try {
      const { nombre, correo, password, estado} = req.body;
      const salt = bcryptjs.genSaltSync(10);
      const usuario = new Usuario({nombre, correo, password, estado});

      usuario.password = bcryptjs.hashSync(password, salt)

      await usuario.save();
      res.json( {usuario} );
    }catch (error){
      res.status(400).json({err: "No se pudo crear el usuario"});
      console.log(error);
    }
  },
  putUsuarios: async (req, res) => {
    const { id } = req.params;
    const { correo, password, estado, ...resto} = req.body;
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});
    res.json({ usuario })
  },
  putUsuariosActivar: async (req,res) =>{
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({ usuario });
  },
  putUsuariosDesactivar: async (req,res) =>{
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: 0}, {new: true});
    res.json({ usuario });
  },
  deleteUsuarios: async (req, res) => {
    const { id } = req.params;
    const result = await Usuario.findByIdAndDelete(id);
    res.json({ result });
  },
  login: async (req, res) => {
    const { correo, password} = req.body;
   

    try {
        const user = await Usuario.findOne({ correo })
        if (!user) {
            return res.status(401).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        if (user.estado === 0) {
            return res.status(401).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: "Usuario / Password no son correctos"
            })
        }


        const token = await generarJWT(user._id);
        res.json({
            usuario: user,
            token
        })

    } catch (error) {

        return res.status(500).json({


            msg: "Hable con el WebMaster"
        })
    }
}
}

export default httpUsuarios;