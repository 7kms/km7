import express from 'express'
import controller from '../controllers/article'
import Permission from '../controllers/permission'
const router = express.Router()


// router.get('/list', controller.list)
router.get('/list/:category?', controller.list)
router.get('/:id', controller.detail)


router.use(Permission.needLogin)
router.post('/', controller.insert)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)


export default router