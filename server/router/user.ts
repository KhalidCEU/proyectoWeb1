import express from 'express';
import { getUser, updateUser } from '../controllers/user';



const router = express.Router();


router.get('/profile', getUser);
router.put('/profile', updateUser);



export default router;


