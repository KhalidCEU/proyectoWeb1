import express from 'express';
import {
    createProduct,
    updateProduct,
    rateProduct,
    deleteProduct,
    getProducts,
    getProduct
} from '../controllers/products';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:productId', getProduct);

productsRouter.post('/', createProduct);
productsRouter.post('/:productId/rate', rateProduct);


productsRouter.put('/:productId', updateProduct);
productsRouter.delete('/:productId', deleteProduct);


export default productsRouter;