import 'dotenv';
import { Product, Favorite, Comment, User } from "../schemas";
import { AsyncRequestHandler } from '../types/requests';
import { getDecodedToken } from '../utils/jwtUtils';


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
        const decodedAuthToken = getDecodedToken(req.headers.cookie || "");
        const userId = decodedAuthToken?.userId;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found', status: 'failure' });
        }

        const comments = await Comment.find({ productId }).populate('user')
            .sort({ date: -1 })
            .lean();

        if(userId) {
            const favorite = await Favorite.findOne({ userId, productId });
            product.isFavorite = !!favorite;
        }

        return res
            .status(200)
            .json({
                item: product,
                comments: comments,
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

export const likeProduct: AsyncRequestHandler = async (req, res) => {
    const { productId } = req.params;
    const decodedAuthToken = getDecodedToken(req.headers.cookie || "");

    if (!decodedAuthToken || !decodedAuthToken.userId) {
        return res.status(401).json({ message: "Unauthorized", status: 'failure' });
    }

    const userId = decodedAuthToken.userId;

    try {
        const existingFavorite = await Favorite.findOne({ userId, productId });

        if (existingFavorite) {
            await Favorite.deleteOne({ userId, productId });
            return res
                .status(200)
                .json({ message: "Product removed from favorites", status: 'success' });
        } else {
            await Favorite.create({ userId, productId });
            return res
                .status(201)
                .json({ message: "Product added to favorites", status: 'success' });
        }

    } catch (error) {
        console.error('Error handling favorite: ', error);

        return res
            .status(500)
            .json({ message: 'Adding the product to favorites failed.', status: 'failure'});
    }
}

export const commentProduct: AsyncRequestHandler = async (req, res) => {
    const { productId } = req.params;
    const { comment } = req.body;
    const decodedAuthToken = getDecodedToken(req.headers.cookie || "");

    if (!decodedAuthToken || !decodedAuthToken.userId) {
        return res.status(401).json({ message: "Unauthorized", status: 'failure' });
    }

    const userId = decodedAuthToken.userId;

    if (!comment || comment.trim() === "") {
        return res.status(400).json({ message: "Comment cannot be empty", status: 'failure' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", status: 'failure' });
        }

        const newComment = new Comment({
            productId,
            user: {
                _id: user._id,
                username: user.username
            },
            comment,
            date: new Date()
        })

        await newComment.save();

        return res
            .status(201)
            .json({ item: newComment, message: 'Comment added succesfully', status: 'success' })

    } catch (error) {
        console.error('Error adding comment: ', error);

        return res
            .status(500)
            .json({ message: 'Error adding comment.', status: 'failure'});
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
        console.error('Product deletion error: ', error);
        return res
            .status(500)
            .json({ message: 'Product deletion failed.', status: 'failure'});
    }
}