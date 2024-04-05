import {Router} from 'express'
import httpCategorias from '../controllers/categorias.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersCategorias from '../helpers/categorias.js'

const router=Router()

router.get("/",httpCategorias.getCategorias)

router.get("/:id",httpCategorias.getCategoriasID)

router.post("/",[
  check('descripcion', "La descripcion no puede estar vacia").notEmpty(),
  check('descripcion', "Debe tener minimo 4 caracteres").isLength({min:4}),
  check('descripcion').custom(helpersCategorias.validarCategoriaUnica),
  check('estado', "solo se permiten numeros").isNumeric(),
  validarCampos
],httpCategorias.postCategorias)

router.put("/:id",[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersCategorias.validarExistaCategoriaId),
  validarCampos
],httpCategorias.putCategorias)

router.put("/activar/:id",[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersCategorias.validarCategoriaUnica),
  validarCampos
],httpCategorias.putCategoriasActivar)

router.put("/desactivar/:id",[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersCategorias.validarExistaCategoriaId),
  validarCampos
],httpCategorias.putCategoriasDesactivar)

router.delete("/:id",[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersCategorias.validarExistaCategoriaId),
  validarCampos
],httpCategorias.deleteCategorias)



export default router