import express from 'express';
import multer from "multer";
import { upload, get } from '../controllers/images';


const imagesRouter = express.Router();

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }).single('file');


imagesRouter.post('/upload', uploadMiddleware, upload);
imagesRouter.get('/:id', get);

export default imagesRouter;

