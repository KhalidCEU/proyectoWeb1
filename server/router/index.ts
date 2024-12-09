import express from 'express';
import authRouter from './auth';
import productsRouter from './products';
import imagesRouter from './images';
import wishlistRouter from './wishlist';
import searchProducts from './products';

const router = express.Router()

router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/images', imagesRouter);
router.use('/wishlist', wishlistRouter);

router.get('/search', searchProducts);

export default router;