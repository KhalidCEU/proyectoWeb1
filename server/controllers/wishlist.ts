import 'dotenv';
import { Favorite } from "../schemas";
import { AsyncRequestHandler } from '../types/requests';
import { getDecodedToken } from '../utils/jwtUtils';


export const getWishlist: AsyncRequestHandler = async (req, res) => {
    const decodedAuthToken = getDecodedToken(req.headers.cookie || "");

    if (!decodedAuthToken || !decodedAuthToken.userId) {
        return res.status(401).json({ message: "Unauthorized", status: 'failure' });
    }

    const userId = decodedAuthToken.userId;

    try {
        const wishlist = await Favorite.find({ userId: userId });
        return res
            .status(200)
            .json({
                items: wishlist,
                message: 'Wishlist retrieved successfully',
                status: 'success'
            })

    } catch (error) {
        console.error('Wishlist fetching error: ', error);

        return res
            .status(500)
            .json({ message: 'Error getting wishlist.', status: 'failure'});
    }
}