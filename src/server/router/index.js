import express from 'express'
import aritcleRouter from './article'
import navRouter from './nav'
const router = express.Router()

// router.use('*',(req,res,next)=>{
//     // console.log(req)
//     next()
// })
router.use('/nav', navRouter)
router.use('/article', aritcleRouter)

export default router