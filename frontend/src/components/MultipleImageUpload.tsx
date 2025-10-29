import React, { useState, useCallback, useEffect } from 'react';
import styles from '../styles/components/multipleImageUpload.module.css';

interface ImageData {
  id: string;
  url: string;
  description: string;
  file?: File;
}

interface MultipleImageUploadProps {
  onImagesChange: (images: ImageData[]) => void;
  onUploadStatusChange?: (allUploaded: boolean) => void;
  maxImages?: number;
  className?: string;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  onImagesChange,
  onUploadStatusChange,
  maxImages = 5,
  className
}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploading, setUploading] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Track upload completion status
  const [previousUploadStatus, setPreviousUploadStatus] = useState<boolean>(true);
  
  useEffect(() => {
    // Small delay to ensure state updates have completed
    const timeoutId = setTimeout(() => {
      // Calculate current upload status
      let currentUploadStatus: boolean;
      
      if (images.length === 0) {
        currentUploadStatus = true;
      } else {
        const allHaveCloudinaryUrls = images.every(img => 
          img.url && !img.url.startsWith('blob:') && !img.file
        );
        const noUploadsInProgress = uploading.length === 0;
        currentUploadStatus = allHaveCloudinaryUrls && noUploadsInProgress;
      }
      
      // Only call callback if status actually changed
      if (currentUploadStatus !== previousUploadStatus) {
        setPreviousUploadStatus(currentUploadStatus);
        
        // Use setTimeout to ensure this runs after current render cycle
        setTimeout(() => {
          onUploadStatusChange?.(currentUploadStatus);
        }, 0);
      }
    }, 100); // Small delay to ensure state is updated
    
    return () => clearTimeout(timeoutId);
  }, [images, uploading, previousUploadStatus, onUploadStatusChange]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://localhost:4000/api/images/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    
    if (!data.imageUrl) {
      throw new Error('No imageUrl in response');
    }
    
    return data.imageUrl;
  };

  const handleFileUpload = useCallback(async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setError('');

    // Process files one by one
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const tempId = generateId();
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        setError(`${file.name} is not an image file`);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} is too large (max 10MB)`);
        continue;
      }

      // Create temp image with blob URL for immediate UI feedback
      const tempImage: ImageData = {
        id: tempId,
        url: URL.createObjectURL(file),
        description: '',
        file
      };

      // Add temp image to state immediately
      setImages(prev => {
        const updated = [...prev, tempImage];
        onImagesChange(updated);
        return updated;
      });
      setUploading(prev => [...prev, tempId]);

      try {
        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(file);
        
        // Update with real URL - FIXED VERSION
        setImages(prevImages => {
          const updated = prevImages.map(img => {
            if (img.id === tempId) {
              return { ...img, url: cloudinaryUrl, file: undefined };
            }
            return img;
          });
          
          // Call parent update AFTER this render cycle
          setTimeout(() => {
            onImagesChange(updated);
          }, 0);
          
          return updated;
        });
      } catch (err: any) {
        console.error(`❌ Cloudinary upload failed for ${file.name}:`, err);
        setError(`Failed to upload ${file.name}: ${err.message}`);
        // Remove failed upload
        setImages(prev => prev.filter(img => img.id !== tempId));
      } finally {
        setUploading(prev => prev.filter(id => id !== tempId));
      }
    }
  }, [images.length, maxImages, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const updateDescription = useCallback((id: string, description: string) => {
    setImages(prev => {
      const updated = prev.map(img => 
        img.id === id ? { ...img, description } : img
      );
      onImagesChange(updated);
      return updated;
    });
  }, [onImagesChange]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      onImagesChange(updated);
      return updated;
    });
  }, [onImagesChange]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.multipleUploadContainer} ${className || ''}`}>
      <div className={styles.uploadLabel}>
        Poll Images ({images.length}/{maxImages})
      </div>
      
      {images.length < maxImages && (
        <div
          className={styles.dropZone}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className={styles.fileInput}
            id="multiple-image-upload"
          />
          <label htmlFor="multiple-image-upload" className={styles.uploadLabel}>
            <div className={styles.uploadPrompt}>
              <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className={styles.uploadText}>
                Add Images
              </span>
              <span className={styles.uploadLimits}>
                Supports JPG, PNG, GIF • Max 10MB each • Up to {maxImages} images
              </span>
            </div>
          </label>
        </div>
      )}

      {images.length > 0 && (
        <div className={styles.imageGrid}>
          {images.map((image) => (
            <div key={image.id} className={styles.imageCard}>
              <div className={styles.imageContainer}>
                <img 
                  src={image.url} 
                  alt={image.description || 'Poll image'} 
                  className={styles.previewImage}
                />
                {uploading.includes(image.id) && (
                  <div className={styles.uploadingOverlay}>
                    <div className={styles.spinner}></div>
                    <span>Uploading...</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className={styles.removeButton}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
              
              <input
                type="text"
                placeholder="Description"
                value={image.description}
                onChange={(e) => updateDescription(image.id, e.target.value)}
                className={styles.descriptionInput}
                maxLength={200}
              />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          ❌ {error}
        </div>
      )}
    </div>
  );
};

export default MultipleImageUpload;