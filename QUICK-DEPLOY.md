# 🚀 Quick Deployment Reference

## Frontend (Netlify)
```bash
# Local test build
cd frontend
npm run build

# Environment Variables to set in Netlify:
VITE_API_BASE_URL=https://your-backend.onrender.com
VITE_CLOUDINARY_CLOUD_NAME=do8a7dwwl
VITE_CLOUDINARY_API_KEY=795872954924379
```

## Backend (Render)
```bash
# Local test build
cd backend
npm run build
npm start

# Key Environment Variables for Render:
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend.netlify.app
JWT_SECRET=your_secure_secret_here
```

## Deployment Order
1. ✅ Deploy Backend to Render first
2. ✅ Copy backend URL
3. ✅ Update frontend VITE_API_BASE_URL
4. ✅ Deploy Frontend to Netlify
5. ✅ Update backend FRONTEND_URL
6. ✅ Test complete application

## URLs After Deployment
- **Frontend:** `https://your-app-name.netlify.app`
- **Backend:** `https://your-backend-name.onrender.com`
- **API Endpoint:** `https://your-backend-name.onrender.com/api`

## Quick Commands
```bash
# Test frontend build locally
npm run build && npm run preview

# Test backend build locally
npm run build && npm start

# Check environment variables
echo $VITE_API_BASE_URL  # Frontend
echo $FRONTEND_URL       # Backend
```