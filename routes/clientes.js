import {Router} from 'express'
import httpClientes from '../controllers/clientes.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helperClientes from '../helpers/clientes.js'


const router = Router()

router.get('/', httpClientes.getClientes)
router.get('/:id', httpClientes.getClientesID)

router.post('/',[
    check('nombre', "El nombre no puede estar vacio").notEmpty(),
    check('nombre', "Debe tener minimo 4 caracteres").isLength({min:4}),
    check('correo', "El correo no puede estar vacio").notEmpty(),
    check('correo').custom(helperClientes.validarCorreoUnica),
    check('correo', "Ingrese un Gmail valido").isEmail(),
    check('direccion', "La direccion no puede estar vacia").notEmpty(),
    validarCampos
], httpClientes.postClientes)

router.put('/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperClientes.validarExistaClienteId),
    validarCampos
], httpClientes.putClientes)

router.put('/Activar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperClientes.validarExistaClienteId),
    validarCampos
], httpClientes.putClientesActivar)

router.put('/Desactivar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperClientes.validarExistaClienteId),
    validarCampos
], httpClientes.putClientesDesactivar)

router.delete('/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperClientes.validarExistaClienteId),
    validarCampos
], httpClientes.deleteClientes)


export default router