import {Router} from 'express'
import httpUsuarios from '../controllers/usuarios.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersUsuario from '../helpers/usuarios.js'
import { validarJWT } from '../middleware/validar-jwt.js'

const router = Router()

router.get('/', httpUsuarios.getUsuarios)
router.get('/:id', httpUsuarios.getUsuariosID)

router.post('/',[
    validarJWT,
    check('nombre', "El no puede estar vacio").notEmpty(),
    check('nombre', "El debe tener minimo 4 caracteres").isLength({min:4}),
    check('correo', "El correo no puede estar vacio").notEmpty(),
    check('correo').custom(helpersUsuario.validarUsuarioUnico),
    check('password', "Debe registrar una contraseña").notEmpty(),
    check('estado', "solo se permiten numeros").isNumeric(),
    validarCampos
], httpUsuarios.postUsuarios)

router.put('/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersUsuario.validarExistaUsuarioId),
    validarCampos 
], httpUsuarios.putUsuarios)
    
router.put('/Activar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersUsuario.validarExistaUsuarioId),
    validarCampos 
], httpUsuarios.putUsuariosActivar)

router.put('/Desactivar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersUsuario.validarExistaUsuarioId),
    validarCampos 
], httpUsuarios.putUsuariosDesactivar)

router.delete('/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersUsuario.validarExistaUsuarioId),
    validarCampos 
], httpUsuarios.deleteUsuarios)

router.post('/login',[
    check('correo').custom(helpersUsuario.noexisteCorreo),
    check('correo', "El correo no es valido").isEmail(),
    validarCampos
], httpUsuarios.login)

export default router