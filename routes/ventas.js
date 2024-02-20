import { Router } from 'express'
import httpVentas from '../controllers/ventas.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersArticulos from '../helpers/articulos.js'

const router = Router()

router.get("/", httpVentas.getVentas);

export default router