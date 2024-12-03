import express from 'express';
import authRouter from './auth';
import productsRouter from './products';

const router = express.Router()

router.use('/auth', authRouter);
router.use('/products', productsRouter);


export default router;