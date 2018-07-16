import express from 'express'
import {articleList,articleDetail} from '../controllers/article'
const router = express.Router()

router.get('/', articleList)
router.post('/', articleList)
router.put('/:id', articleDetail)
router.delete('/:id', articleDetail)

export default router