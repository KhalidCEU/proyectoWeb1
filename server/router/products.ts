import express from 'express';
import { createProduct, updateProduct, deleteProduct, getProducts } from '../controllers/products';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.post('/', createProduct);
productsRouter.put('/:productId', updateProduct);
productsRouter.delete('/:productId', deleteProduct);


export default productsRouter;