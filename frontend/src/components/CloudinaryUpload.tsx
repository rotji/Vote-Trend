import React, { useState } from 'react';
import styles from '../styles/components/cloudinaryUpload.module.css';

interface CloudinaryUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onImageUpload,
  currentImage,
  className
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const [error, setError] = useState('');

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
      const response = await fetch(`${apiBaseUrl}/api/images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      const imageUrl = data.imageUrl;
      
      setPreviewUrl(imageUrl);
      onImageUpload(imageUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setPreviewUrl('');
    onImageUpload('');
  };

  return (
    <div className={`${styles.uploadContainer} ${className || ''}`}>
      <div className={styles.uploadLabel}>Poll Image (optional)</div>
      
      {!previewUrl ? (
        <div
          className={styles.dropZone}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
            id="image-upload"
            disabled={uploading}
          />
          <label htmlFor="image-upload" className={styles.uploadLabel}>
            {uploading ? (
              <div className={styles.uploadingState}>
                <div className={styles.spinner}></div>
                <span>Uploading...</span>
              </div>
            ) : (
              <div className={styles.uploadPrompt}>
                <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className={styles.uploadText}>
                  Drag & drop an image here, or click to select
                </span>
                <span className={styles.uploadSubtext}>
                  Perfect for photos of Trump, Messi, celebrities, politicians
                </span>
                <span className={styles.uploadLimits}>
                  Supports JPG, PNG, GIF • Max 10MB
                </span>
              </div>
            )}
          </label>
        </div>
      ) : (
        <div className={styles.imagePreview}>
          <img src={previewUrl} alt="Poll preview" className={styles.previewImage} />
          <div className={styles.imageActions}>
            <button
              type="button"
              onClick={removeImage}
              className={styles.removeButton}
              title="Remove image"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          ❌ {error}
        </div>
      )}

      <div className={styles.helpText}>
        💡 <strong>Pro tip:</strong> Upload high-quality images of real people (politicians like Trump/Biden, 
        athletes like Messi/Ronaldo, celebrities, etc.) for better engagement. Images are automatically 
        optimized and stored securely in the cloud. Perfect for production deployment!
      </div>
    </div>
  );
};

export default CloudinaryUpload;