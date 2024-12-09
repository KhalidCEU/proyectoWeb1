import express from 'express';
import authRouter from './auth';
import productsRouter from './products';
import imagesRouter from './images';
import wishlistRouter from './wishlist';

const router = express.Router()

router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/images', imagesRouter);
router.use('/wishlist', wishlistRouter);


export default router;