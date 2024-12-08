import 'dotenv';
import { User } from '../schemas/user';
import { AsyncRequestHandler } from '../types/requests';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



export const getUser: AsyncRequestHandler = async (req, res) => {
    const token = req.cookies;
    //console.log(token);

    
    //console.log(token.auth_token);
    const decode = jwt.verify(token.auth_token, process.env.JWT_SECRET as string);
    //console.log(decode.userId);

    
    const user = await User.findOne({ _id: decode.userId });

    //console.log(user);
        
    res.json(user);

};

export const updateUser: AsyncRequestHandler = async (req, res) => {
    const token = req.cookies;
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const decode = jwt.verify(token.auth_token, process.env.JWT_SECRET as string);
        const userId = decode.userId;

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            { _id: userId },
            {
                $set: {
                    name,
                    username,
                    password: hashedPassword,
                },
            }
        );

        res.json({ message: 'Profile updated successfully' });
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
            return res.status(404).json({ message: "User not found", status: 'failure' });
        }

        
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully', status: 'success' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error', status: 'failure' });
    }
};



