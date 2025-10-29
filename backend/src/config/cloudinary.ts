import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import multer from 'multer';
import { validateImageUpload } from '../utils/validation';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage (we'll upload directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// Upload image to Cloudinary
const uploadToCloudinary = async (buffer: Buffer, originalName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'vote-trend/polls',
        public_id: `poll_${Date.now()}_${originalName.split('.')[0]}`,
        transformation: [
          { width: 800, height: 600, crop: 'limit' }, // Limit max size
          { quality: 'auto' }, // Auto quality optimization
          { fetch_format: 'auto' }, // Auto format (WebP when supported)
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || '');
        }
      }
    ).end(buffer);
  });
};

// Controller for image upload
export const uploadImage = async (req: Request, res: Response) => {
  try {
    console.log('📷 Image upload request received');
    console.log('File info:', req.file ? {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : 'No file');

    if (!req.file) {
      console.log('❌ No file provided in request');
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Validate the uploaded file
    const validation = validateImageUpload(req.file);
    if (!validation.isValid) {
      console.log('❌ File validation failed:', validation.errors);
      return res.status(400).json({ 
        error: 'File validation failed', 
        details: validation.errors 
      });
    }

    console.log('🚀 Starting Cloudinary upload...');
    const imageUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    console.log('✅ Cloudinary upload successful:', imageUrl);

    res.json({
      success: true,
      imageUrl,
      message: 'Image uploaded successfully',
    });
  } catch (error: any) {
    console.error('❌ Image upload error:', error);
    res.status(500).json({
      error: 'Failed to upload image',
      details: error.message,
    });
  }
};

// Delete image from Cloudinary (optional utility)
export const deleteImage = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Image deletion error:', error);
    return false;
  }
};

export { upload };
export default cloudinary;