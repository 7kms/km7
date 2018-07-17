import express from 'express'
import controller from '../controllers/article'
const router = express.Router()


router.get('/list', controller.list)
router.get('/list/:categoryId', controller.list)
router.get('/:id', controller.detail)


router.post('/', controller.insert)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)


export default router