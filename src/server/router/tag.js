import express from 'express'
import controller from '../controllers/tag'
const router = express.Router()

router.get('/', controller.list)
router.post('/', controller.insert)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

export default router