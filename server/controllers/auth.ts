import 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/user';
import { hash, compare } from 'bcrypt';
import { AsyncRequestHandler } from '../types/requests';

export const login: AsyncRequestHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid credentials', status: 'failure' });
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: 'Invalid credentials', status: 'failure' })
        }

        const token = jwt
            .sign(
                { userId: user._id }, process.env.JWT_SECRET as string,
                { expiresIn: '1h',}
            );

        res.json({
            user,
            status: 'success',
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const register: AsyncRequestHandler = async (req, res) => {
    const { username, password } = req.body;
    const SALT_ROUNDS = 10;
    const JWT_SECRET= process.env.JWT_SECRET

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res
                .status(409)
                .json({ message: 'Username already taken', status: 'failure' });
        }

        const hashedPassword = await hash(password, SALT_ROUNDS);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const token = jwt
            .sign(
                { userId: newUser._id },
                JWT_SECRET as string,
                { expiresIn: '1h', }
            );

        return res
            .status(201)
            .json({ userId: newUser._id, status: 'success', token});

    } catch (error) {
        console.error('Registration error:', error);

        return res
            .status(500)
            .json({ message: 'Server error' });
    }
};