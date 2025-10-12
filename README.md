# 🚀 Modern Portfolio with Database Integration

A professional portfolio website built with **Next.js 15**, **TypeScript**, and **PostgreSQL**, featuring a LinkedIn-style admin panel and real-time content management.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel)](https://vercel.com/)

## ✨ Features

### 🎨 **Modern UI/UX**
- Glass morphism effects with smooth animations
- Responsive design optimized for all devices
- Professional gradient backgrounds and effects
- Interactive components with hover states

### 📊 **Database-Powered**
- **PostgreSQL** database with Supabase
- Real-time content updates
- Professional data persistence
- Scalable architecture ready for growth

### ⚙️ **LinkedIn-Style Admin Panel**
- **Full CRUD operations** for all content
- **Certificate management** with verification links
- **Project portfolio** with technology tags
- **Experience timeline** with company details
- **Skills management** with proficiency levels

### 🔗 **LinkedIn Integration**
- Automatic profile data syncing
- Certificate auto-import from LinkedIn
- Fallback to manual admin panel management
- Real-time API integration support

### 🚀 **Production Ready**
- **Vercel deployment** optimized
- **Environment configuration** for all stages
- **Type-safe** operations throughout
- **Performance optimized** with modern practices

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Styling** | Tailwind CSS v4, CSS3 Animations |
| **Database** | PostgreSQL (Supabase) |
| **Authentication** | Supabase Auth (optional) |
| **Deployment** | Vercel Edge Network |
| **APIs** | LinkedIn, Proxycurl, RapidAPI |

## 🚀 Quick Start

### **1. Clone Repository**
```bash
git clone https://github.com/Rithan678/myportfolio.git
cd myportfolio
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Database Setup**
1. Create account at [Supabase](https://supabase.com)
2. Create new project with PostgreSQL
3. Run SQL scripts:
   - Execute `database/schema.sql` in Supabase SQL Editor
   - Execute `database/sample-data.sql` to populate data

### **4. Environment Configuration**
```bash
cp .env.example .env.local
```

Update `.env.local` with your credentials:
```env
# Required: Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: LinkedIn Integration
PROXYCURL_API_KEY=your-proxycurl-key
RAPIDAPI_KEY=your-rapidapi-key
```

### **5. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to see your portfolio!

## 📊 Database Structure

### **Tables Overview**
- **`profiles`** - Main profile information
- **`experience`** - Work experience and roles
- **`certificates`** - Certifications with verification
- **`projects`** - Portfolio projects with tech stack
- **`skills`** - Technical skills with proficiency

### **Key Features**
- **Relational design** with proper foreign keys
- **Automatic timestamps** with update triggers
- **Indexed queries** for optimal performance
- **Type-safe operations** with TypeScript

## 🎯 Admin Panel Usage

### **Access Admin Panel**
Navigate to `/admin` to manage your portfolio content:

1. **Profile Tab** - Update name, headline, summary
2. **Experience Tab** - Manage work history
3. **Certificates Tab** - Add/edit certifications
4. **Projects Tab** - Showcase your work
5. **Skills Tab** - List technical expertise

### **Real-time Updates**
- Changes save immediately to database
- Portfolio updates instantly
- No cache clearing needed
- Professional data persistence

## 🌐 Deployment Guide

### **Vercel Deployment**
1. **Connect Repository** to Vercel
2. **Add Environment Variables** in Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
3. **Deploy** - Automatic deployment on push to main

### **Database Configuration**
- Supabase handles all database operations
- No additional server setup required
- Automatic backups and scaling
- Professional PostgreSQL hosting

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/           # Admin panel interface
│   │   ├── api/             # API routes for database operations
│   │   └── page.tsx         # Main portfolio page
│   ├── components/          # Reusable React components
│   └── lib/                 # Database configuration and utilities
├── database/
│   ├── schema.sql           # Database table definitions
│   └── sample-data.sql      # Initial portfolio data
├── public/                  # Static assets and images
└── docs/                    # Documentation files
```

## 🔧 Customization

### **Profile Information**
Update your details in the admin panel or modify `database/sample-data.sql` before deployment.

### **Styling**
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components
- Customize color scheme in CSS variables

### **LinkedIn Integration**
- Add API keys for automatic syncing
- Configure LinkedIn profile URL
- Customize data mapping in API routes

## 📚 Documentation

- **[Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[Admin Panel Guide](./ADMIN_PANEL_GUIDE.md)** - Admin interface documentation  
- **[LinkedIn Integration](./LINKEDIN_INTEGRATION_GUIDE.md)** - API setup and configuration
- **[Database Schema](./database/schema.sql)** - Complete database structure

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📧 Contact

**Rithan D'Souza**
- LinkedIn: [rithan-dsouza](https://www.linkedin.com/in/rithan-dsouza-6a02b81ab/)
- GitHub: [Rithan678](https://github.com/Rithan678)
- Portfolio: [Live Demo](https://myportfolio-rithan678.vercel.app)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository** if you found it helpful!

Built with ❤️ using Next.js, TypeScript, and Supabase.