import {Router} from 'express'
import httpCompras from '../controllers/compras.js'

const router = Router()

router.get('/', httpCompras.getCompras)
router.get('/:id', httpCompras.getComprasID)
router.get('/populate/:id', httpCompras.getComprasPopulate)

router.post('/', httpCompras.postCompras)




export default router