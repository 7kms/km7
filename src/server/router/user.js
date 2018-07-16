import express from 'express'
import controller from '../controllers/user'

const router = express.Router()

router.post('/login', controller.login)
router.get('/profile', controller.profile)
router.get('/:id', controller.detail)

export default router