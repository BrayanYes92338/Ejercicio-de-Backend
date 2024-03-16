import { Router } from 'express'
import httpClientes from '../controllers/clientes.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helperClientes from '../helpers/clientes.js'


const router = Router()

router.get("/",httpClientes.getCliente);
router.get("/:id",httpClientes.getClienteID);
router.post("/",[
    check('nombre', "El nombre no puede estar vacio").notEmpty(),
    check('nombre', "Debe tener minimo 4 caracteres").isLength({min:4}),
    check('correo', "El correo no puede estar vacio").notEmpty(),
    check('correo').custom(helperClientes.validarcorreounico),
    check('direccion', "La direccion no puede estar vacia").notEmpty(),
    validarCampos
],httpClientes.postCliente);
router.put("/:id",[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperClientes.validarExistaClienteId),
    validarCampos
],httpClientes.putCliente);
router.put("/activar/:id",[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperClientes.validarExistaClienteId),
    validarCampos
],httpClientes.putClienteActivar);
router.put("/desactivar/:id",[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperClientes.validarExistaClienteId),
    validarCampos
],httpClientes.putClienteDesactivar);
router.delete("/:id",[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helperClientes.validarExistaClienteId),
    validarCampos
], httpClientes.deleteCliente)

export default router