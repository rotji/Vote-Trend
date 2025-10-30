# 🚀 Vote-Trend Deployment Guide

This guide covers the deployment of Vote-Trend application with frontend on Netlify and backend on Render.

## 📋 Prerequisites

- Git repository with your code
- Netlify account (free tier available)
- Render account (free tier available)
- Domain name (optional, for custom domains)

## 🌐 Frontend Deployment (Netlify)

### Step 1: Prepare Your Repository

1. Ensure your code is pushed to GitHub/GitLab/Bitbucket
2. Make sure `netlify.toml` is in your frontend root directory
3. Verify `package.json` has the correct build scripts

### Step 2: Deploy to Netlify

1. **Connect Repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose your Git provider and repository
   - Select your repository

2. **Configure Build Settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`

3. **Environment Variables:**
   Add these environment variables in Netlify dashboard (Site settings > Environment variables):
   ```
   VITE_API_BASE_URL=https://your-backend-app-name.onrender.com
   VITE_CLOUDINARY_CLOUD_NAME=do8a7dwwl
   VITE_CLOUDINARY_API_KEY=795872954924379
   VITE_NODE_ENV=production
   ```

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your frontend

### Step 3: Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. Ensure `render.yaml` is in your backend root directory
2. Verify `package.json` has production scripts
3. Make sure TypeScript compiles correctly

### Step 2: Deploy to Render

1. **Connect Repository:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" > "Web Service"
   - Connect your Git repository

2. **Configure Service:**
   - **Name:** `vote-trend-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`

3. **Environment Variables:**
   Add these in Render dashboard (Environment tab):
   ```
   NODE_ENV=production
   PORT=10000
   
   # Database Configuration
   POSTGRES_HOST=aws-1-eu-north-1.pooler.supabase.com
   POSTGRES_PORT=5432
   POSTGRES_DB=postgres
   POSTGRES_USER=postgres.mriaqjhdlnbdcvutprey
   POSTGRES_PASSWORD=rotji5maste5john4
   POSTGRES_SSL=true
   
   MONGODB_URI=mongodb+srv://starrotji:BKlE1Hb0bYe5T4Tm@maste-errand.zyhxz.mongodb.net/vote_trend?retryWrites=true&w=majority
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=do8a7dwwl
   CLOUDINARY_API_KEY=795872954924379
   CLOUDINARY_API_SECRET=T1J8qIJUwBxxHrV_Kfojj5JB_Is
   
   # Security
   JWT_SECRET=your_secure_jwt_secret_here
   
   # Frontend URL (update after frontend deployment)
   FRONTEND_URL=https://your-frontend-app-name.netlify.app
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy your backend

### Step 3: Update Frontend API URL

After backend deployment:

1. Copy your Render backend URL (e.g., `https://vote-trend-backend.onrender.com`)
2. Update `VITE_API_BASE_URL` in Netlify environment variables
3. Redeploy frontend by triggering a new build

## 🔄 Post-Deployment Steps

### 1. Test Your Application

- Visit your Netlify frontend URL
- Test API connectivity
- Verify database connections
- Test image uploads (Cloudinary)

### 2. Configure CORS

Ensure your backend's `FRONTEND_URL` environment variable matches your Netlify URL exactly.

### 3. SSL Certificates

Both Netlify and Render provide free SSL certificates automatically.

### 4. Monitoring

- **Netlify:** Check deploy logs and function logs
- **Render:** Monitor service logs and performance metrics

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check package.json scripts
   - Verify all dependencies are listed
   - Check build logs for specific errors

2. **API Connection Issues:**
   - Verify CORS configuration
   - Check environment variables
   - Ensure backend URL is correct in frontend

3. **Database Connection:**
   - Verify database credentials
   - Check SSL settings
   - Ensure database allows connections from Render IPs

4. **Image Upload Issues:**
   - Verify Cloudinary credentials
   - Check upload presets
   - Test Cloudinary configuration

### Environment Variables Checklist

**Frontend (Netlify):**
- ✅ `VITE_API_BASE_URL`
- ✅ `VITE_CLOUDINARY_CLOUD_NAME`
- ✅ `VITE_CLOUDINARY_API_KEY`

**Backend (Render):**
- ✅ `NODE_ENV=production`
- ✅ `PORT=10000`
- ✅ All database credentials
- ✅ Cloudinary credentials
- ✅ `JWT_SECRET`
- ✅ `FRONTEND_URL`

## 📈 Scaling Considerations

### Render Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- 750 hours/month usage limit
- Consider upgrading for production workloads

### Netlify Free Tier Limitations
- 100GB bandwidth/month
- 300 minutes build time/month
- Consider upgrading for high-traffic sites

## 🔒 Security Best Practices

1. **Environment Variables:**
   - Never commit secrets to Git
   - Use strong, unique passwords
   - Rotate secrets regularly

2. **Database Security:**
   - Use SSL connections
   - Limit database access by IP if possible
   - Regular security updates

3. **API Security:**
   - Implement rate limiting
   - Use HTTPS only
   - Validate all inputs

## 📞 Support

- **Netlify Support:** [https://docs.netlify.com/](https://docs.netlify.com/)
- **Render Support:** [https://docs.render.com/](https://docs.render.com/)
- **Project Repository:** [Your GitHub Repository]

---

**Note:** Remember to update URLs and credentials in this documentation to match your actual deployment.