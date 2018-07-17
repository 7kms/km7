import express from 'express'
import aritcleRouter from './article'
import navRouter from './nav'
import userRouter from './user'
import catetoryRouter from './category'
import tagRouter from './tag'
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
router.get('/article', aritcleRouter)

//article manage at background
router.use(Permission.needLogin)
router.use('/category', catetoryRouter)
router.use('/tag', tagRouter)
router.use('/article', aritcleRouter)

export default router