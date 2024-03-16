import { Router } from 'express'
import httpVentas from '../controllers/ventas.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helperventas from "../helpers/ventas.js"

const router = Router()

router.get("/", httpVentas.getVentas);
router.get("/:id", httpVentas.getVentasID);
router.get("/populate/:id", httpVentas.getVentaspopulate)
router.post("/",[
    check("idcliente", "El idcliente no puede estar vacio").notEmpty(),
    check("numero", "El numero no puede estar vacio").notEmpty(),
    check("numero").custom(helperventas.validarventunica),
    validarCampos
],httpVentas.postVentas)
router.put("/:id",[
    check("id", "Se nesecita un mongoid valido").isMongoId(),
    check("id").custom(helperventas.validarexitaventaID),
    validarCampos

],httpVentas.putVentas)
router.put("/activar/:id",[
    check("id", "Se nesecita un mongoid valido").isMongoId(),
    check("id").custom(helperventas.validarexitaventaID),
    validarCampos
], httpVentas.putVentasActivar)
router.put("/desactivar/:id",[
    check("id", "Se nesecita un mongoid valido").isMongoId(),
    check("id").custom(helperventas.validarexitaventaID),
    validarCampos
], httpVentas.putVentasDesactivar)
router.delete("/:id",[
    check("id", "Se nesecita un mongoid valido").isMongoId(),
    check("id").custom(helperventas.validarexitaventaID),
    validarCampos
], httpVentas.deleteVentas)


export default router