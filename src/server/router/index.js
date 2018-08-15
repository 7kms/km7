import express from 'express'
import navRouter from './nav'
import userRouter from './user'
import catetoryRouter from './category'
import tagRouter from './tag'
import aritcleRouter from './article'
import Permission from '../controllers/permission'
const router = express.Router()


router.use('*', (req,res,next)=>{
    let start = new Date();
    logger.log(`--> api request: ${req.originalUrl}`)
    let calResponseTime = function () {
        let end = new Date(); 
        logger.log(`<-- api response: ${req.originalUrl}, ${end-start}`)
    }
    next()  
    res.once('close', calResponseTime);
})
router.use('/user', userRouter)
router.use('/nav', navRouter)
router.use('/article', aritcleRouter)
router.use('/category',Permission.needLogin, catetoryRouter)
router.use('/tag', Permission.needLogin, tagRouter)
router.use((req,res)=>{
    logger.warn(`404, ${req.originalUrl}`)
    res.sendStatus(404)
})

export default router