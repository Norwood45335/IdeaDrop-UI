# IdeaDrop Frontend Deployment Guide

## Environment Variables for Vercel

To fix the network connection errors, you need to configure environment variables in your Vercel deployment:

### Frontend (IdeaDrop-UI)

1. Go to your Vercel dashboard
2. Select your frontend project
3. Go to Settings > Environment Variables
4. Add the following environment variable:

**For Production:**
- Variable: `VITE_PRODUCTION_API_URL`
- Value: `https://your-backend-vercel-url.vercel.app` (replace with your actual backend Vercel URL)

### Backend (IdeaDrop-API)

Make sure your backend is properly configured for CORS to allow requests from your frontend domain.

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

1. **Deploy Backend First**: Make sure your backend API is deployed and get its Vercel URL
2. **Set Environment Variables**: Add `VITE_PRODUCTION_API_URL` in your frontend Vercel project settings
3. **Redeploy Frontend**: Trigger a new deployment of your frontend after setting the environment variable

## Troubleshooting

- Ensure CORS is properly configured on your backend for your frontend domain
- Check that environment variables are set correctly in Vercel
- Verify your backend API endpoints are accessible at the production URL
