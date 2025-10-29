# 🌐 Environment Variables Guide

This document lists all environment variables used in the Vote-Trend application for different deployment environments.

## 📁 **Frontend Environment Variables**
**File: `frontend/.env`**

### 🔧 **API Configuration**
```env
# Backend API endpoint
VITE_API_BASE_URL=http://localhost:4000                    # Development
# VITE_API_BASE_URL=https://api.vote-trend.com            # Production
```

### 🎨 **External Services**
```env
# Google Services
VITE_GOOGLE_ICONS_URL=https://fonts.googleapis.com/icon?family=Material+Icons

# CDN URLs
VITE_GOOGLE_ICONS_CDN=https://cdn.jsdelivr.net/gh/devicons/devicon/icons
VITE_UNSPLASH_BASE_URL=https://images.unsplash.com
```

### 📸 **Placeholder Images**
```env
# Default placeholders for different content types
VITE_PLACEHOLDER_LANDSCAPE_URL=https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80
VITE_PLACEHOLDER_PORTRAIT_URL=https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=400&q=80
VITE_PLACEHOLDER_POLITICAL_URL=https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80
VITE_PLACEHOLDER_SPORTS_URL=https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80
```

### ☁️ **Cloudinary Configuration**
```env
# Get these from your Cloudinary dashboard
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
VITE_CLOUDINARY_API_KEY=your_actual_api_key
```

---

## 📁 **Backend Environment Variables**
**File: `backend/.env`**

### 🗄️ **Database Configuration**
```env
# PostgreSQL (Supabase)
POSTGRES_HOST=aws-1-eu-north-1.pooler.supabase.com
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres.mriaqjhdlnbdcvutprey
POSTGRES_PASSWORD=your_password
POSTGRES_SSL=true

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vote_trend?retryWrites=true&w=majority
```

### ☁️ **Cloudinary Configuration**
```env
# Image upload and management
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### 🔐 **Security**
```env
# JWT token secret
JWT_SECRET=your_jwt_secret_key_here

# Server configuration
PORT=4000
NODE_ENV=development
```

---

## 🚀 **Environment-Specific Configurations**

### 🏠 **Development**
```env
# Frontend
VITE_API_BASE_URL=http://localhost:4000

# Backend
PORT=4000
NODE_ENV=development
```

### 🧪 **Staging**
```env
# Frontend
VITE_API_BASE_URL=https://api-staging.vote-trend.com

# Backend
PORT=4000
NODE_ENV=staging
```

### 🌐 **Production**
```env
# Frontend
VITE_API_BASE_URL=https://api.vote-trend.com

# Backend
PORT=process.env.PORT || 4000
NODE_ENV=production
```

---

## ✅ **Benefits of This Setup**

### 🔄 **Easy Deployment**
- ✅ No code changes needed between environments
- ✅ Same codebase for dev/staging/production
- ✅ Environment-specific configurations

### 🔒 **Security**
- ✅ Sensitive data in environment files only
- ✅ No hardcoded URLs or API keys in code
- ✅ Different secrets per environment

### 🚀 **Scalability**
- ✅ Easy to change CDN providers
- ✅ Switch between development/production APIs
- ✅ Cloudinary images work in any environment

### 🛠️ **Maintenance**
- ✅ All URLs in one place
- ✅ Easy to update external service URLs
- ✅ Clear separation of concerns

---

## 🎯 **Quick Setup Checklist**

1. ✅ **Frontend `.env`**: Copy from `.env.example` and update URLs
2. ✅ **Backend `.env`**: Add real database and Cloudinary credentials  
3. ✅ **Cloudinary**: Get credentials from dashboard
4. ✅ **Database**: Ensure `image_url` column exists in polls table
5. ✅ **Test**: Upload an image and create a poll

**Your Vote-Trend platform is now production-ready with proper environment configuration!** 🎉