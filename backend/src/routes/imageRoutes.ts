import express from 'express';
import { upload, uploadImage } from '../config/cloudinary';

const router = express.Router();

// Upload image endpoint
router.post('/upload', upload.single('image'), uploadImage);

export default router;