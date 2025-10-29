// Simple validation utilities for development
// Lightweight validation without heavy dependencies

export const validatePollData = (data: any) => {
  const errors: string[] = [];

  // Title validation
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string');
  } else if (data.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  } else if (data.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  // Category validation
  const validCategories = ['Sports', 'Politics', 'Entertainment', 'Health', 'Tech', 'Education', 'Others'];
  if (!data.category || !validCategories.includes(data.category)) {
    errors.push('Category must be one of: ' + validCategories.join(', '));
  }

  // Description validation
  if (!data.description || typeof data.description !== 'string') {
    errors.push('Description is required and must be a string');
  } else if (data.description.trim().length < 1) {
    errors.push('Description cannot be empty');
  }

  // Creator ID validation
  if (!data.creator_id || typeof data.creator_id !== 'number') {
    errors.push('Creator ID is required and must be a number');
  }

  // Options validation
  if (!data.options || !Array.isArray(data.options)) {
    errors.push('Options are required and must be an array');
  } else if (data.options.length < 2) {
    errors.push('At least 2 options are required');
  } else if (data.options.length > 10) {
    errors.push('Maximum 10 options allowed');
  } else {
    // Validate each option
    data.options.forEach((option: any, index: number) => {
      if (!option || typeof option !== 'string' || option.trim().length === 0) {
        errors.push(`Option ${index + 1} must be a non-empty string`);
      } else if (option.length > 100) {
        errors.push(`Option ${index + 1} must be less than 100 characters`);
      }
    });
  }

  // Images validation (optional, supports multiple)
  if (data.images && Array.isArray(data.images)) {
    if (data.images.length > 10) {
      errors.push('Maximum 10 images allowed per poll');
    }
    
    data.images.forEach((image: any, index: number) => {
      if (typeof image === 'string') {
        // Validate URL
        try {
          new URL(image);
        } catch {
          errors.push(`Image ${index + 1} must be a valid URL`);
        }
      } else if (typeof image === 'object' && image.url) {
        // Validate image object with URL and description
        try {
          new URL(image.url);
        } catch {
          errors.push(`Image ${index + 1} URL must be valid`);
        }
        
        if (image.description && image.description.length > 200) {
          errors.push(`Image ${index + 1} description must be less than 200 characters`);
        }
      } else {
        errors.push(`Image ${index + 1} must be a valid URL or image object`);
      }
    });
  }

  // Legacy image URL validation (backward compatibility)
  if (data.image_url && typeof data.image_url === 'string') {
    try {
      new URL(data.image_url);
    } catch {
      errors.push('Image URL must be a valid URL');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateVoteData = (data: any) => {
  const errors: string[] = [];

  // User ID validation
  if (!data.user_id || typeof data.user_id !== 'number') {
    errors.push('User ID is required and must be a number');
  }

  // Option ID validation
  if (!data.option_id || typeof data.option_id !== 'number') {
    errors.push('Option ID is required and must be a number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateImageUpload = (file: any) => {
  const errors: string[] = [];

  if (!file) {
    errors.push('No file provided');
    return { isValid: false, errors };
  }

  // File type validation
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    errors.push('File must be an image (JPEG, PNG, GIF, or WebP)');
  }

  // File size validation (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Simple sanitization
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export const sanitizePollData = (data: any) => {
  return {
    ...data,
    title: sanitizeInput(data.title),
    description: sanitizeInput(data.description),
    options: Array.isArray(data.options) ? data.options.map(sanitizeInput) : []
  };
};