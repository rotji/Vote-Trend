// API configuration utilities
const isDevelopment = import.meta.env.MODE === 'development';
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Determine API base URL based on environment
export const API_BASE_URL = (() => {
  // Check if environment variable is set (production)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Development mode or localhost
  if (isDevelopment || isLocalhost) {
    return 'http://localhost:4000';
  }
  
  // Production fallback (Render backend)
  return 'https://vote-trend.onrender.com';
})();

console.log('🔗 API Configuration:', {
  mode: import.meta.env.MODE,
  hostname: window.location.hostname,
  apiBaseUrl: API_BASE_URL,
  envApiUrl: import.meta.env.VITE_API_BASE_URL,
});

// Helper function for API calls with better error handling
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  console.log(`🌐 API Call: ${options.method || 'GET'} ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'include', // Include credentials for CORS
      ...options,
    });

    console.log(`📡 Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        error: `HTTP ${response.status}: ${response.statusText}` 
      }));
      console.error('❌ API Error:', error);
      throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ API Success:', endpoint);
    return data;
  } catch (error) {
    console.error('🚨 API Call Failed:', {
      endpoint,
      url,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
};

export default { API_BASE_URL, apiCall };