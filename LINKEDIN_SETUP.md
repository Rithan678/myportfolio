# LinkedIn OAuth Setup Instructions

## Step 1: Create LinkedIn Developer App

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
2. Click "Create App"
3. Fill in the required information:
   - **App name**: "Portfolio LinkedIn Import" (or your preferred name)
   - **LinkedIn Page**: Create or select a LinkedIn Page for your app
   - **Privacy policy URL**: You can use a placeholder for now
   - **App logo**: Upload any logo (optional)

## Step 2: Configure OAuth Settings

1. In your LinkedIn app dashboard, go to "Auth" tab
2. Add these **Redirect URLs**:
   - For local development: `http://localhost:3000/api/linkedin/callback`
   - For production: `https://your-domain.vercel.app/api/linkedin/callback`

3. Request the following **OAuth 2.0 scopes**:
   - `r_liteprofile` - Access to basic profile information
   - `r_emailaddress` - Access to email address

## Step 3: Get Your Credentials

1. In the "Auth" tab, copy your:
   - **Client ID**
   - **Client Secret**

## Step 4: Update Environment Variables

1. Open `.env.local` in your portfolio project
2. Replace the placeholder values:

```env
LINKEDIN_CLIENT_ID=your_actual_client_id_here
LINKEDIN_CLIENT_SECRET=your_actual_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
```

## Step 5: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Click the "Import from LinkedIn" button
4. Authenticate with LinkedIn
5. Your profile data should be imported automatically!

## For Production (Vercel Deployment)

1. In your Vercel dashboard, add environment variables:
   - `LINKEDIN_CLIENT_ID`
   - `LINKEDIN_CLIENT_SECRET` 
   - `LINKEDIN_REDIRECT_URI` (use your deployed URL)

2. Update your LinkedIn app's redirect URLs to include your production domain

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**: 
   - Ensure redirect URLs in LinkedIn app match exactly with your env vars
   - Include both http://localhost:3000/api/linkedin/callback and https://yourdomain.com/api/linkedin/callback

2. **"invalid_client" error**:
   - Double-check your Client ID and Client Secret
   - Ensure no extra spaces in environment variables

3. **Scope permissions denied**:
   - Some LinkedIn profile fields require additional permissions
   - Basic profile and email should work for most applications

## What Data Gets Imported

The integration currently imports:
- First Name
- Last Name  
- Professional Headline
- Email Address
- LinkedIn Profile ID
- Profile Picture (if available)

## Next Steps

- Add more LinkedIn API endpoints (experience, education, skills)
- Store imported data in a database
- Create an admin panel to manage imported content
- Add automatic sync functionality