import express from 'express'
import {navList} from '../controllers/nav'
const router = express.Router()

router.get('/', navList)

export default router