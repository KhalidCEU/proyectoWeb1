import express from 'express';
import { getWishlist } from '../controllers/wishlist';

const wishlistRouter = express.Router();

wishlistRouter.get('/', getWishlist);

export default wishlistRouter;

