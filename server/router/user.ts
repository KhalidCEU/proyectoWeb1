import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/user';



const router = express.Router();


router.get('/profile', getUser);
router.put('/profile', updateUser);
router.delete('/profile', deleteUser);



export default router;


