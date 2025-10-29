// External URL constants - all configurable via environment variables

// External URL constants - all configurable via environment variables

export const EXTERNAL_URLS = {
  // API Configuration
  API_BASE: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  
  // External Services
  GOOGLE_ICONS: import.meta.env.VITE_GOOGLE_ICONS_URL || 'https://fonts.googleapis.com/icon?family=Material+Icons',
  
  // CDN URLs
  UNSPLASH_BASE: import.meta.env.VITE_UNSPLASH_BASE_URL || 'https://images.unsplash.com',
  GOOGLE_ICONS_CDN: import.meta.env.VITE_GOOGLE_ICONS_CDN || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons',
  
  // Placeholder Images
  PLACEHOLDER_LANDSCAPE: import.meta.env.VITE_PLACEHOLDER_LANDSCAPE_URL || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  PLACEHOLDER_PORTRAIT: import.meta.env.VITE_PLACEHOLDER_PORTRAIT_URL || 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=400&q=80',
  PLACEHOLDER_POLITICAL: import.meta.env.VITE_PLACEHOLDER_POLITICAL_URL || 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80',
  PLACEHOLDER_SPORTS: import.meta.env.VITE_PLACEHOLDER_SPORTS_URL || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
  
  // Legacy (keeping for backward compatibility)
  DEFAULT_POLL_IMAGE: import.meta.env.VITE_DEFAULT_POLL_IMAGE || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  SPORTS_PLACEHOLDER: import.meta.env.VITE_SPORTS_PLACEHOLDER || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: import.meta.env.VITE_CLOUDINARY_API_KEY,
};

// Specific URL builders
export const buildUnsplashUrl = (photoId: string, options = 'auto=format&fit=crop&w=400&q=80') => 
  `${EXTERNAL_URLS.UNSPLASH_BASE}/photo-${photoId}?${options}`;

export const buildGoogleIconUrl = (iconName: string, variant = 'original') => 
  `${EXTERNAL_URLS.GOOGLE_ICONS_CDN}/${iconName}/${iconName}-${variant}.svg`;

// Sports team placeholder images
export const PLACEHOLDER_IMAGES = {
  MANCHESTER_CITY: buildUnsplashUrl('1506744038136-46273834b3fb'),
  REAL_MADRID: buildUnsplashUrl('1464983953574-0892a716854b'),
  BAYERN_MUNICH: buildUnsplashUrl('1519125323398-675f0ddb6308'),
  DEFAULT_SPORTS: EXTERNAL_URLS.SPORTS_PLACEHOLDER,
};

export default EXTERNAL_URLS;