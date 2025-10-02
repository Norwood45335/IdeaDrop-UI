# IdeaDrop Frontend Deployment Guide

## Current Issue: Render Free Tier Spin Down

You're experiencing "timeout of 10000ms exceeded" errors because:

1. **Render Free Tier Limitation**: Services spin down after 15 minutes of inactivity
2. **Cold Start Delay**: Takes 30-60 seconds to wake up
3. **Timeout Too Short**: Your app only waited 10 seconds (now 30 seconds)

## Solutions

### Immediate Fix: Use Correct Render URL
Your backend is on Render, not Vercel. The correct URL is: `https://ideadrop-api.onrender.com`

### Keep-Alive Implementation
The app now includes an automatic keep-alive service that:
- Pings the backend every 10 minutes
- Prevents Render from spinning down due to inactivity
- Only runs in production

### Alternative Solutions
1. **Upgrade Render**: $7/month removes spin down completely
2. **External Monitoring**: Use UptimeRobot (free) to ping every 5 minutes
3. **Switch Platforms**: Vercel doesn't spin down but has other limitations

## Fix Steps

### Step 1: Get Your Backend URL

First, find your deployed backend URL:
1. Go to your Vercel dashboard
2. Find your backend project (IdeaDrop-API)
3. Copy the deployment URL (should look like: `https://idea-drop-api-xyz.vercel.app`)

### Step 2: Update Frontend Environment Variables

In your Vercel frontend project settings:

1. Go to your Vercel dashboard
2. Select your frontend project (IdeaDrop-UI)
3. Go to Settings > Environment Variables
4. Add/Update:

**For Production:**

- Variable: `VITE_PRODUCTION_API_URL`
- Value: `https://your-actual-backend-url.vercel.app` (use the URL from Step 1)

### Step 3: Update Backend CORS

Your backend needs to allow your frontend domain. In your backend `server.js`, make sure your frontend Vercel URL is in the `allowedOrigins` array.

### Backend (IdeaDrop-API)

Make sure your backend is properly configured for CORS to allow requests from
your frontend domain.

## Step 4: Redeploy

After setting the environment variable:
1. Go to your frontend Vercel project
2. Go to the Deployments tab
3. Click "Redeploy" on the latest deployment
4. Or push a new commit to trigger automatic redeployment

## Verification

After redeployment, check:
1. Browser Network tab shows requests going to correct API URL
2. No CORS errors in console
3. API responses are successful

## Local Development

For local development, use:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The local development will use `http://localhost:8000` as the API URL.

## Deployment Steps

1. **Deploy Backend First**: Make sure your backend API is deployed and get its
   Vercel URL
2. **Set Environment Variables**: Add `VITE_PRODUCTION_API_URL` in your frontend
   Vercel project settings
3. **Redeploy Frontend**: Trigger a new deployment of your frontend after
   setting the environment variable

## Troubleshooting

### Common Issues and Solutions

1. **"timeout of 10000ms exceeded"**
   - Check that `VITE_PRODUCTION_API_URL` is set correctly in Vercel
   - Verify your backend is actually deployed and accessible
   - Test the backend API directly in browser: `https://your-backend-url.vercel.app/api`

2. **CORS Errors**
   - Add your frontend Vercel URL to backend's `allowedOrigins` array
   - Make sure both frontend and backend are deployed on Vercel
   - Check backend logs for CORS rejection messages

3. **Environment Variables Not Working**
   - Environment variables in Vercel must start with `VITE_` for frontend
   - Redeploy after changing environment variables
   - Check the Variables are set in the correct project (frontend vs backend)

4. **API Returns 404**
   - Verify API routes are correct (`/api/ideas`, `/api/auth`)
   - Check backend deployment logs for errors
   - Test individual endpoints with tools like Postman

### Debug Steps

1. **Check Network Tab**: Open browser DevTools → Network tab to see actual requests
2. **Check Console**: Look for detailed error messages
3. **Test Backend**: Visit `https://your-backend-url.vercel.app/api` directly
4. **Check Vercel Logs**: Review deployment logs in Vercel dashboard

## Current Configuration

- **Frontend Timeout**: Increased to 30 seconds for better reliability
- **Local API**: `http://localhost:8000`
- **Production API**: Set via `VITE_PRODUCTION_API_URL` environment variable
