import express from 'express';
import authRouter from './auth';
import productsRouter from './products';
import imagesRouter from './images';

const router = express.Router()

router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/images', imagesRouter);

export default router;