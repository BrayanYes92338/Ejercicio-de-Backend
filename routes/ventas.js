import {Router} from 'express'
import httpVentas from '../controllers/ventas.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersVentas from '../helpers/ventas.js'

const router = Router()

router.get('/', httpVentas.getVentas)
router.get('/:id', httpVentas.getVentasID)
router.get('/populate/:id', httpVentas.getVentasPopulate)

router.post('/',[
    check('idcliente', "El idcliente no puede estar vacio").notEmpty(),
    check('numero', "El numero no puede estar vacio").notEmpty(),
    check('numero').custom(helpersVentas.validarVentaUnica),
    validarCampos
], httpVentas.postVentas)

router.put('/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersVentas.validarExistaVentasId),
    validarCampos
], httpVentas.putVentas)

router.put('/Desactivar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersVentas.validarExistaVentasId),
    validarCampos
], httpVentas.putVentasDesactivar)

router.put('/Activar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersVentas.validarExistaVentasId),
    validarCampos
], httpVentas.putVentasActivar)



export default router