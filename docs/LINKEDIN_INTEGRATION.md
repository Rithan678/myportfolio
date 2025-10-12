# LinkedIn Integration Setup Guide

## Environment Variables Setup

To enable real LinkedIn data fetching, add the following API keys to your `.env.local` file:

### Option 1: Proxycurl API (Recommended)
```
PROXYCURL_API_KEY=your_proxycurl_api_key_here
```

### Option 2: RapidAPI LinkedIn Profiles
```
RAPIDAPI_KEY=your_rapidapi_key_here
```

### Option 3: Scrapfly API
```
SCRAPFLY_API_KEY=your_scrapfly_api_key_here
```

## How It Works

1. **Automatic Sync**: The portfolio automatically fetches LinkedIn data every hour
2. **Manual Refresh**: Users can manually refresh LinkedIn data using the "Refresh LinkedIn Data" button
3. **Caching**: LinkedIn data is cached for 1 hour to reduce API calls
4. **Fallback**: If API fails, cached data is used as fallback

## API Endpoints

- `GET /api/linkedin/auto-import` - Automatic data fetching with caching
- `POST /api/linkedin/auto-import` - Manual data refresh

## Features

### Real-time Certificate Sync
- Certificates automatically appear when added to LinkedIn
- Each certificate includes:
  - Certificate name and issuer
  - Issue date and expiration (if applicable)
  - Credential ID and verification links
  - Direct links to certificate and LinkedIn profile
  - Associated skills tags

### Certificate Display
- **View Certificate**: Direct link to the actual certificate
- **LinkedIn**: Link to the certificate on LinkedIn profile
- **Skills Tags**: Clickable skill tags associated with each certificate
- **Auto-refresh Indicator**: Shows when data was last synced

## Adding Certificates to LinkedIn

1. Go to your LinkedIn profile
2. Click "Add profile section" → "Licenses & certifications"
3. Fill in the certificate details:
   - Name: Full certificate name
   - Issuing organization: Company/Institution that issued it
   - Issue date: When you received the certificate
   - Expiration date: If applicable
   - Credential ID: Certificate ID for verification
   - Credential URL: Direct link to verify the certificate

4. Save the certificate
5. Your portfolio will automatically sync the new certificate within 1 hour
6. Or use the "Refresh LinkedIn Data" button for immediate sync

## Certificate URL Examples

- **Canva**: `https://www.canva.com/certificates/[ID]`
- **Coursera**: `https://www.coursera.org/account/accomplishments/certificate/[ID]`
- **freeCodeCamp**: `https://www.freecodecamp.org/certification/[username]/[certificate]`
- **Udemy**: `https://www.udemy.com/certificate/[ID]/`
- **LinkedIn Learning**: `https://www.linkedin.com/learning/certificates/[ID]`
- **Google**: `https://skillshop.exceedlms.com/student/path/[ID]`

The portfolio will automatically display all your LinkedIn certificates with proper links and verification options!