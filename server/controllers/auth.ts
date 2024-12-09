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
                { userId: user._id, role: user.role}, process.env.JWT_SECRET as string,
                { expiresIn: '1h',}
            );

        res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Lax;`);

        res.json({
            user,
            token,
            status: 'success',
            message:'Logged in successfully',
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const register: AsyncRequestHandler = async (req, res) => {
    const { username, password, confirmedPassword } = req.body;
    const SALT_ROUNDS = 10;
    const JWT_SECRET= process.env.JWT_SECRET

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res
                .status(409)
                .json({ message: 'Username already taken', status: 'failure' });
        }

        if (password !== confirmedPassword) {
            return res
                .status(400)
                .json({ message: 'Passwords do not match', status: 'failure' });
        }

        const hashedPassword = await hash(password, SALT_ROUNDS);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const token = jwt
            .sign(
                { userId: newUser._id, role: newUser.role },
                JWT_SECRET as string,
                { expiresIn: '1h', }
            );

        return res
            .status(201)
            .json({
                userId: newUser._id,
                status: 'success',
                message:'Registered successfully',
                token
            });

    } catch (error) {
        console.error('Registration error:', error);

        return res
            .status(500)
            .json({ message: 'Server error' });
    }
};

export const logout: AsyncRequestHandler = async (req, res) => {
    try {
        res.setHeader('Set-Cookie', `auth_token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Lax;`);
        return res
            .status(200)
            .json({ message: 'Logout successful', status: 'success' });

    } catch (error) {
        console.error("Logout error", error);

        return res
            .status(500)
            .json({ message: 'Server error' });
    }
};