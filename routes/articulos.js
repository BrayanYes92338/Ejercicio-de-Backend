import { Router } from 'express'
import httpArticulos from '../controllers/articulos.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersArticulos from '../helpers/articulos.js'
import helpersCategorias from '../helpers/categorias.js'

const router = Router()

router.get('/', httpArticulos.getArticulos)
router.get('/:id', httpArticulos.getArticulosID)
router.post('/', [
    check('idcategoria', "Se necesita un id de mongo valido").isMongoId(),
    check('idcategoria').custom(helpersCategorias.validarExistaId),
    check('nombre', "Se requiere que se ingrese un nombre").notEmpty(),
    check('nombre', "Se requiere que un nombre con maximo 10 caracteres").isLength({ min: 4, max: 30 }),
    check('nombre').custom(helpersArticulos.validarArticuloUnico),
    check('precio', "se requiere un valor numero").isNumeric(),
    validarCampos
], httpArticulos.postArticulos)
router.put('/:id', [

    check('id').custom(helpersArticulos.validarExistaId),
   check('id', "Se necesita un id de mongo valido").isMongoId(),
   check('idcategoria', "Se necesita un id de mongo valido").isMongoId(),
    validarCampos
], httpArticulos.putArticulos)
router.put('/activar/:id', [
    check('id', "Se necesita un id de mongo valido").isMongoId(),
    check('id').custom(helpersCategorias.validarExistaId),
    

    validarCampos
], httpArticulos.putArticulosActivar)
router.put('/desactivar/:id', [
    check('id', "Se necesita un id de mongo valido").isMongoId(),
    check('id').custom(helpersCategorias.validarExistaId),

    validarCampos
], httpArticulos.putArticulosDesactivar)
router.delete('/:id', [
    check('id', "Se necesita un id de mongo valido").isMongoId(),
    check('id').custom(helpersArticulos.validarExistaId),

    validarCampos
], httpArticulos.deleteArticulos)



export default router