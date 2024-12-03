import 'dotenv';
import { Product } from '../schemas/product';
import { AsyncRequestHandler } from '../types/requests';

export const getProducts: AsyncRequestHandler = async (req, res) => {
    try {
        const products = await Product.find()

        return res
            .status(200)
            .json({
                items: products,
                message: 'Products retrieved successfully',
                status: 'success'
            });

    } catch (error) {
        console.error('Product fetching error: ', error);
        return res
            .status(500)
            .json({ message: 'Error getting products.', status: 'failure'});
    }
}

export const getProduct: AsyncRequestHandler = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId)

        return res
            .status(200)
            .json({
                items: product,
                message: 'Product retrieved successfully',
                status: 'success'
            });

    } catch (error) {
        console.error('Product fetching error: ', error);
        return res
            .status(500)
            .json({ message: 'Error getting product.', status: 'failure'});
    }
}

export const createProduct: AsyncRequestHandler = async (req, res) => {
    const { name, description, rating, imageUrl, isFavorite,
            estimatedPrice, comments } = req.body;

    try {
        const newProduct = new Product({ name, description, rating, imageUrl,
                        isFavorite, estimatedPrice, comments });

        await newProduct.save();

        return res
            .status(201)
            .json({ item: newProduct, message: "Product created succesfully", status: 'success' });

    } catch (error) {
        console.error('Product creation error: ', error);
        return res
            .status(500)
            .json({ message: 'Product creation failed.', status: 'failure'});
    }
}

export const rateProduct: AsyncRequestHandler = async (req, res) => {
    const { productId } = req.params;
    const { userId, rating } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res
                .status(404)
                .json({ message: "Product not found", status: 'failure' });
        }

        const existingRatingIndex = product.ratings.findIndex(r => (r.userId?.toString() ?? '') === userId);

        if (existingRatingIndex !== -1) {
            product.ratings[existingRatingIndex].rating = rating;
        } else {
            product.ratings.push({ userId, rating });
        }

        const totalRatings = product.ratings.reduce((acc, r) => acc + (r.rating ?? 0), 0);
        product.averageRating = totalRatings / product.ratings.length;

        await product.save();
        const updatedProduct = await Product.findById(productId);

        return res
            .status(200)
            .json({ item: updatedProduct, message: "Product rating updated successfully", status: 'success' });

    } catch (error) {
        console.error('Product rating update error: ', error);
        return res
            .status(500)
            .json({ message: 'Product rating update failed.', status: 'failure' });
    }
}

export const updateProduct: AsyncRequestHandler = async (req, res) => {
    const { productId } = req.params;

    const { name, description, rating, imageUrl, isFavorite,
        estimatedPrice, comments } = req.body;

    try {
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res
                .status(404)
                .json({ message: "Product not found", status: 'failure' });
        }
        console.log("SERVER| Product ID/ ", productId);
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                rating,
                imageUrl,
                isFavorite,
                estimatedPrice,
                comments
            },
            { new: true }
        );

        return res
            .status(200)
            .json({ item: updatedProduct, message: "Product updated successfully", status: 'success' });

    } catch (error) {
        console.error('Product update error: ', error);
        return res
            .status(500)
            .json({ message: 'Product update failed.', status: 'failure'});
    }
}

export const deleteProduct: AsyncRequestHandler = async (req, res) => {
    const { productId } = req.params;

    try {
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res
                .status(404)
                .json({ message: "Product not found", status: 'failure' });
        }

        await Product.findByIdAndDelete(productId);

        return res
            .status(200)
            .json({ message: "Product deleted successfully", status: 'success' });

    } catch (error) {
        console.error('Product deletio error: ', error);
        return res
            .status(500)
            .json({ message: 'Product deletio failed.', status: 'failure'});
    }
}