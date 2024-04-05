import {Router} from 'express'
import httpProveedor from '../controllers/proveedor.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersProveedor from '../helpers/proveedor.js'

const router = Router()

router.get('/', httpProveedor.getProveedor)
router.get('/:id', httpProveedor.getProveedorID)

router.post('/',[
    check('nombre', "El nombre no puede estar vacio").notEmpty(),
    check('nombre', "Debe tener minimo 4 caracteres").isLength({min:4}),
    check('correo', "El correo no puede estar vacio").notEmpty(),
    check('correo').custom(helpersProveedor.validarCorreoUnico),
    check('correo', "Ingrese un Gmail valido").isEmail(),
    check('empresa', "La empresa no puede estar vacio").notEmpty(),
    validarCampos
], httpProveedor.postProveedor)

router.put('/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putProveedor)

router.put('/Activar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putActivarProveedor)

router.put('/Desactivar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putDesactivarProveedor)

router.delete('/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.deleteProveedor)

export default router