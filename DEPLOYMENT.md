# Deployment Guide for ZOE Wiki

## 🚀 Deploying to Vercel

### Prerequisites
1. A Vercel account (sign up at vercel.com)
2. Google Cloud Console access for OAuth setup
3. Git repository (GitHub, GitLab, or Bitbucket)

### Step 1: Set up Google OAuth for Gmail Authentication

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - For local: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://your-domain.vercel.app/api/auth/callback/google`
   - Save your Client ID and Client Secret

### Step 2: Prepare Environment Variables

Generate a NextAuth secret:
```bash
openssl rand -base64 32
```

Create these environment variables in Vercel:
- `NEXTAUTH_URL`: Your production URL (e.g., https://zoe-wiki.vercel.app)
- `NEXTAUTH_SECRET`: The generated secret from above
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
- `ALLOWED_EMAIL_DOMAIN` (optional): Restrict to specific domain (e.g., zoe.health)

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts to link your project
```

#### Option B: Deploy via GitHub Integration
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Click "Deploy"

### Step 4: Configure Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add all required variables:
   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-generated-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

### Step 5: Update Google OAuth Redirect URIs

After deployment, update your Google OAuth settings:
1. Go back to Google Cloud Console
2. Edit your OAuth 2.0 Client ID
3. Add your production URL to authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`

## 🔒 Security Considerations

### Authentication
- Gmail authentication is configured but currently uses a demo mode
- In production, remove the demo authentication and use only Google OAuth
- Consider implementing role-based access control (RBAC)

### Data Storage
- Currently uses localStorage for content edits
- For production, implement a proper database (PostgreSQL, MongoDB, etc.)
- Use Vercel's database solutions or external providers

### Environment Variables
- Never commit `.env.local` to version control
- Use Vercel's environment variable management
- Rotate secrets regularly

## 📝 Post-Deployment Checklist

- [ ] Verify Google OAuth login works
- [ ] Test content editing with authenticated user
- [ ] Check all pages load correctly
- [ ] Verify PDF upload/download functionality
- [ ] Test responsive design on mobile devices
- [ ] Set up monitoring and error tracking
- [ ] Configure custom domain (optional)
- [ ] Set up database for persistent storage
- [ ] Enable Vercel Analytics (optional)

## 🔧 Troubleshooting

### Google OAuth Issues
- Ensure redirect URIs match exactly (including trailing slashes)
- Check that Google+ API is enabled
- Verify environment variables are set correctly

### Build Errors
- Check Node.js version compatibility (requires Node 18+)
- Ensure all dependencies are installed
- Review build logs in Vercel dashboard

### Authentication Not Working
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your deployment URL
- Ensure cookies are enabled in browser

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Google OAuth Setup Guide](https://support.google.com/cloud/answer/6158849)

## Support

For issues specific to the ZOE Wiki, please contact your development team.
For Vercel platform issues, visit [Vercel Support](https://vercel.com/support).
