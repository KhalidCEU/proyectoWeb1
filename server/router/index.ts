import express from 'express';
import authRouter from './auth';
import productsRouter from './products';
import userRouter from './user';
import imagesRouter from './images';

const router = express.Router()

router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/user', userRouter);
router.use('/images', imagesRouter);

export default router;