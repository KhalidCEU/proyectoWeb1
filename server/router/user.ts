import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/profile', getUser);
userRouter.put('/profile/update', updateUser);
userRouter.delete('/profile/delete', deleteUser);

export default userRouter;