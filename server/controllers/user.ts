import 'dotenv';
import { User } from '../schemas/user';
import { AsyncRequestHandler } from '../types/requests';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getUser: AsyncRequestHandler = async (req, res) => {
    const token = req.cookies;
    //console.log(token);

    const decodedToken = jwt.verify(token.auth_token, process.env.JWT_SECRET as string);
    const userId = decodedToken.userId;
    //console.log(decode.userId);
    
    const user = await User.findOne({ _id: userId });

    //console.log(user);

    return res
        .status(200)
        .json({
            items: user,
            message: 'User data fetched succesfully.',
            status: 'success'
        }) 
};

export const updateUser: AsyncRequestHandler = async (req, res) => {
    const token = req.cookies;
    const { name, username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username or password can't be empty", status: 'failure' });
    }

    try {
        const decode = jwt.verify(token.auth_token, process.env.JWT_SECRET as string);
        const userId = decode.userId;

        const newPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { name, username, newPassword },
            { new: true }
        );

        return res
            .status(200)
            .json({ item: updatedUser, message: 'User updated successfully', status: 'success' });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteUser: AsyncRequestHandler = async (req, res) => {
    const token = req.cookies;

    try {
       
        const decode = jwt.verify(token.auth_token, process.env.JWT_SECRET as string);
        const userId = decode.userId;
       
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res
                .status(404)
                .json({ message: "User not found", status: 'failure' });
        }
        
        await User.findByIdAndDelete(userId);

        return res
            .status(200)
            .json({ message: 'User deleted successfully', status: 'success' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error', status: 'failure' });
    }
};



