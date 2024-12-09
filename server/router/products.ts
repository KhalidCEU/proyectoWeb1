import express from 'express';
import {
    createProduct,
    updateProduct,
    rateProduct,
    deleteProduct,
    getProducts,
    getProduct,
    likeProduct,
    commentProduct
} from '../controllers/products';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:productId', getProduct);

productsRouter.post('/', createProduct);
productsRouter.post('/:productId/rate', rateProduct);
productsRouter.post('/:productId/like', likeProduct);
productsRouter.post('/:productId/comment', commentProduct);


productsRouter.put('/:productId', updateProduct);
productsRouter.delete('/:productId', deleteProduct);


export default productsRouter;