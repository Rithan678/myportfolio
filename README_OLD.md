# Rithan D'Souza - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features an admin panel for content management and a contact form for client inquiries.

## 🚀 Features

- **Modern Design**: Clean, professional layout with dark theme and gradient accents
- **Responsive**: Fully responsive design that works on all devices
- **Admin Panel**: Complete content management system for projects and messages
- **Contact Form**: Functional contact form with validation
- **Project Showcase**: Dynamic project cards with technology tags
- **SEO Optimized**: Proper meta tags and structured data
- **Fast Performance**: Built with Next.js for optimal performance

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel-ready
- **Database**: In-memory storage (easily extensible to database)

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/          # Admin panel
│   ├── api/            # API routes
│   │   ├── contact/    # Contact form API
│   │   └── projects/   # Projects CRUD API
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
└── components/
    ├── ContactForm.tsx # Contact form component
    └── ProjectCard.tsx # Project showcase component
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📝 Usage

### Public Portfolio
- **Homepage**: Showcases your profile, projects, and contact information
- **Projects Section**: Displays featured projects with descriptions and links
- **Contact Form**: Allows visitors to send you messages directly

### Admin Panel
Access the admin panel at `/admin` to:
- **Manage Projects**: Add, edit, and delete projects
- **View Messages**: Read and manage contact form submissions
- **Toggle Featured**: Mark projects as featured to display on homepage

## 🔧 Customization

### Personal Information
Update your personal information in `src/app/page.tsx`:
- Name and title
- Profile description
- Social media links
- LinkedIn profile link

### Styling
- Colors and gradients can be modified in Tailwind classes
- Global styles are in `src/app/globals.css`
- Component styles use Tailwind CSS utility classes

### API Integration
The project currently uses in-memory storage. To integrate with a database:
1. Replace the in-memory arrays in API routes with database calls
2. Add your preferred database (Prisma, MongoDB, etc.)
3. Update the API routes in `src/app/api/`

## 🚀 Deployment on Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Update DNS settings as instructed

## 🎨 Features Overview

### Homepage Sections
- **Hero**: Personal introduction with call-to-action buttons
- **About**: Professional summary and key statistics
- **Projects**: Featured project showcase
- **Contact**: Contact form for inquiries

### Admin Features
- **Project Management**: Full CRUD operations for projects
- **Message Management**: View and manage contact submissions
- **Featured Toggle**: Control which projects appear on homepage
- **Real-time Updates**: Changes reflect immediately on the public site

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## 🔐 Security Notes

- The admin panel currently has no authentication
- For production use, consider adding authentication
- Validate and sanitize all user inputs
- Consider rate limiting for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **LinkedIn**: [rithan-dsouza-6a02b81ab](https://www.linkedin.com/in/rithan-dsouza-6a02b81ab)
- **Email**: rithan.dsouza@email.com
- **GitHub**: [Your GitHub Profile]

---

Built with ❤️ using Next.js and deployed on Vercel.
