import { Router } from 'express'
import httpCategorias from '../controllers/categorias.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersCategorias from '../helpers/categorias.js'
const router = Router()

router.get("/", httpCategorias.getCategorias)
router.get("/:id", httpCategorias.getCategoriasID)
router.post("/", [
    check('descripcion', "La descripcion no puede estar vacias").notEmpty(),
    check('descripcion', "La descripcion debe tener un maximo de 6 digitos y maximo de 30").isLength({ min: 6, max: 30 }),
    check('descripcion').custom(helpersCategorias.validarCategoriaUnica),
    check('estado', "Solo se acepta numeros").isNumeric(),
    validarCampos
], httpCategorias.postCategorias)
router.put("/:id", [
    check('id', "Se necesita una id mongo valido ").isMongoId(),
    check('id').custom(helpersCategorias.validarExistaId),
    validarCampos
], httpCategorias.putCategorias)
router.put("/activar/:id",[
    check('id', "Se necesita una id mongo valido ").isMongoId(),
    check('id').custom(helpersCategorias.validarExistaId),
    validarCampos
], httpCategorias.putCategoriasActivar)
router.put("/desactivar/:id",[
    check('id', "Se necesita una id mongo valido ").isMongoId(),
    check('id').custom(helpersCategorias.validarExistaId),
    validarCampos
    
], httpCategorias.putCategoriasDesactivar)
router.delete("/:id",[
    check('id', "Se necesita una id mongo valido ").isMongoId(),
    check('id').custom(helpersCategorias.validarExistaId),
    validarCampos
], httpCategorias.deleteCategorias)



export default router