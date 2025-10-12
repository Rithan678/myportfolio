# How to Add Your Profile Image

To add your professional photo to the portfolio:

1. **Save your image**: Save the attached image as `rithan-profile.jpg` in the `public/images/` folder
2. **Image requirements**: 
   - Format: JPG, PNG, or WebP
   - Recommended size: 400x400 pixels or larger
   - The image will be displayed as a circle, so square images work best

3. **File location**: `public/images/rithan-profile.jpg`

The portfolio is already configured to display your image automatically once you place it in the correct location.

## Alternative: Using a different filename

If you want to use a different filename, update the image source in `src/app/page.tsx`:
- Find the line: `src="/images/rithan-profile.jpg"`
- Change it to: `src="/images/your-filename.jpg"`