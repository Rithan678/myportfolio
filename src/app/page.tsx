"use client";

import { useState, useEffect } from 'react';
import { PortfolioDB } from '../lib/supabase';

export default function Home() {
  const [displayData, setDisplayData] = useState({
    firstName: 'Rithan',
    lastName: 'D\'Souza',
    headline: 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
    summary: 'Passionate BCA student with expertise in web development, focusing on modern technologies like React, Next.js, and TypeScript. Currently working as a Student Intern at IQAC Editorial Board while pursuing Bachelor\'s in Computer Applications.',
    location: 'Mangalore, Karnataka, India',
    profileImage: '',
    connections: { totalConnections: 150 },
    skills: [
      { name: 'React.js', proficiency: 4 },
      { name: 'Next.js', proficiency: 4 },
      { name: 'TypeScript', proficiency: 3 },
      { name: 'JavaScript', proficiency: 4 },
      { name: 'Node.js', proficiency: 3 },
      { name: 'HTML5', proficiency: 5 },
      { name: 'CSS3', proficiency: 4 },
      { name: 'Tailwind CSS', proficiency: 4 }
    ],
    projects: [
      {
        title: 'Portfolio Website with LinkedIn Integration',
        description: 'Built a modern portfolio website using Next.js 15, TypeScript, and Tailwind CSS with real-time LinkedIn data integration.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'LinkedIn API', 'Supabase'],
        url: 'https://github.com/rithan678/myportfolio',
        status: 'completed'
      },
      {
        title: 'Student Management System',
        description: 'Developed a comprehensive student management system as part of BCA curriculum with role-based access control.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        status: 'completed'
      },
      {
        title: 'E-learning Platform',
        description: 'Interactive e-learning platform for college students with video streaming and real-time chat.',
        technologies: ['Next.js', 'Socket.io', 'PostgreSQL', 'AWS'],
        url: 'https://github.com/rithan-dsouza/elearning',
        status: 'ongoing'
      }
    ],
    experience: [
      {
        title: 'Student Intern',
        company: 'IQAC Editorial Board',
        location: 'St Aloysius College, Mangalore',
        startDate: '2024-01-15',
        current: true,
        description: 'Contributing to editorial processes and content management for the Internal Quality Assurance Cell.'
      },
      {
        title: 'Web Development Volunteer',
        company: 'College Tech Club',
        location: 'St Aloysius College, Mangalore',
        startDate: '2023-08-01',
        endDate: '2023-12-31',
        current: false,
        description: 'Developed and maintained the college tech club website. Organized coding workshops for junior students.'
      }
    ],
    certificates: [
      {
        name: 'Web Development Foundations',
        issuer: 'LinkedIn Learning',
        issueDate: '2024-01-15',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React']
      },
      {
        name: 'Next.js Development',
        issuer: 'Professional Development',
        issueDate: '2024-03-20',
        skills: ['Next.js', 'React', 'TypeScript', 'SSR']
      },
      {
        name: 'TypeScript Fundamentals',
        issuer: 'Microsoft Learn',
        issueDate: '2024-02-10',
        skills: ['TypeScript', 'JavaScript', 'Type Safety']
      }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load data from database
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setIsLoading(true);
        
        if (PortfolioDB.isDatabaseAvailable()) {
          const profile = await PortfolioDB.getProfile('default_user');
          if (profile) {
            setDisplayData(prev => ({
              ...prev,
              firstName: profile.first_name,
              lastName: profile.last_name,
              headline: profile.headline,
              summary: profile.summary,
              location: profile.location,
              profileImage: profile.profile_image,
              connections: { totalConnections: profile.connections }
            }));
          }
        }
      } catch (error) {
        console.log('Using fallback data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-white text-xl font-bold">Portfolio</h1>
            </div>
            <div className="flex space-x-4">
              <a href="/admin" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Admin Dashboard
              </a>
              <a href="#projects" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {displayData.firstName[0]}{displayData.lastName[0]}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">
                {displayData.firstName} {displayData.lastName}
              </h1>
              <p className="text-xl text-blue-300 mb-4">{displayData.headline}</p>
              <p className="text-slate-300 mb-4">{displayData.summary}</p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-slate-400">
                <span>📍 {displayData.location}</span>
                <span>🤝 {displayData.connections.totalConnections} connections</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>
          <div className="space-y-6">
            {displayData.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <p className="text-blue-300 mb-2">{exp.company} • {exp.location}</p>
                <p className="text-slate-400 text-sm mb-3">
                  {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                </p>
                <p className="text-slate-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects" className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.projects.map((project, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {project.status}
                  </span>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {displayData.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white">{skill.name}</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className={`w-3 h-3 rounded-full ${
                      star <= skill.proficiency ? 'bg-blue-500' : 'bg-gray-600'
                    }`}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Certificates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.certificates.map((cert, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{cert.name}</h3>
                <p className="text-blue-300 mb-2">{cert.issuer}</p>
                <p className="text-slate-400 text-sm mb-4">{new Date(cert.issueDate).toLocaleDateString()}</p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Get In Touch</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Your Email" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea placeholder="Your Message" rows={4} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}