import express from 'express'
import {articleList,articleDetail} from '../controllers/article'
const router = express.Router()

router.get('/:category', articleList)
router.get('/:category/:id', articleDetail)

export default router