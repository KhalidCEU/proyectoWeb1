import express from 'express';
import {
    searchProducts,
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

productsRouter.get('/search', searchProducts);

productsRouter.get('/', getProducts);
productsRouter.get('/:productId', getProduct);

productsRouter.post('/', createProduct);
productsRouter.post('/:productId/rate', rateProduct);
productsRouter.post('/:productId/like', likeProduct);
productsRouter.post('/:productId/comment', commentProduct);


productsRouter.put('/:productId', updateProduct);
productsRouter.delete('/:productId', deleteProduct);


export default productsRouter;