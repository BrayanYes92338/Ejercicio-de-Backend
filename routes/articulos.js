import {Router} from 'express'
import httpArticulos from '../controllers/articulos.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersArticulos from '../helpers/articulos.js'



const router=Router()

router.get('/', httpArticulos.getArticulos)
router.get('/:id',httpArticulos.getArticulosID)

router.post('/',[
  check('nombre', "El nombre no puede estar vacia").notEmpty(),
  check('nombre', "Debe tener minimo 4 caracteres").isLength({min:4}),
  check('nombre').custom(helpersArticulos.validarArticuloUnica),
  check('precio', "Solo se permiten numeros").isNumeric(),
  check('stock', "Solo se permiten numeros").isNumeric(),
  validarCampos
], httpArticulos.postArticulos)

router.put('/:id',[
  check('id',"Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersArticulos.validarExistaArticulosId),
  validarCampos
], httpArticulos.putArticulos)

router.put('/activar/:id',[
  check('id',"Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersArticulos.validarExistaArticulosId),
  validarCampos
], httpArticulos.putArticulosActivar)

router.put('/desactivar/:id',[
  check('id',"Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersArticulos.validarExistaArticulosId),
  validarCampos
], httpArticulos.putArticulosDesactivar)

router.delete('/:id',[
  check('id',"Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersArticulos.validarExistaArticulosId),
  validarCampos
],httpArticulos.deleteArticulos)


export default router