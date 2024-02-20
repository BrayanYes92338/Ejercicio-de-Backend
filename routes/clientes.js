import { Router } from 'express'
import httpClientes from '../controllers/clientes.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'


const router = Router()

router.get("/",httpClientes.getClientes);
router.post("/",httpClientes.postCliente);
router.delete("/:id", httpClientes.deleteCliente)

export default router