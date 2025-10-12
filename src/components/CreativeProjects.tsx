"use client";

import { useState } from 'react';
import { ExternalLink, Github, Calendar, Users, Star } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  status: string;
  projectUrl?: string;
  demoUrl?: string;
  highlights?: string[];
  collaborators?: string[];
  dateCompleted?: string;
  dateStarted?: string;
}

interface CreativeProjectsProps {
  projects?: Project[];
}

export default function CreativeProjects({ projects = [] }: CreativeProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');

  // Default projects if none provided
  const defaultProjects = [
    {
      name: "CureMe - Healthcare Platform",
      description: "Developed an innovative healthcare platform designed to improve patient care and enhance medical service accessibility. Features include patient-provider connectivity, appointment scheduling, and health record management.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL", "Healthcare APIs"],
      status: "Completed",
      projectUrl: "https://github.com/rithan-dsouza/curme-healthcare",
      demoUrl: "https://curme-healthcare.netlify.app",
      highlights: ["User-friendly interface", "Patient-provider connectivity", "Appointment system", "Health record management"],
      collaborators: ["Healthcare professionals", "UX designers", "Backend developers"],
      dateCompleted: "August 2024"
    },
    {
      name: "Portfolio Website",
      description: "Personal portfolio website built with Next.js 15 and TypeScript, featuring LinkedIn integration, responsive design, and modern UI components. Includes admin panel for content management and real-time data updates.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Vercel", "LinkedIn API"],
      status: "Ongoing", 
      projectUrl: "https://github.com/rithan-dsouza/portfolio",
      demoUrl: "https://rithan-dsouza.vercel.app",
      highlights: ["LinkedIn integration", "Responsive design", "Modern tech stack", "Admin panel"],
      dateStarted: "October 2024"
    },
    {
      name: "IQAC Bulletin Management System",
      description: "Contributing to the development and maintenance of institutional bulletin and content management systems. Involved in creating digital publications, managing editorial workflows, and ensuring quality standards.",
      technologies: ["Content Management Systems", "WordPress", "Digital Publishing Tools", "Editorial Workflows"],
      status: "Ongoing",
      projectUrl: "https://staloysius.edu.in/iqac",
      highlights: ["Digital publication management", "Quality assurance integration", "Editorial workflow optimization"],
      collaborators: ["IQAC team members", "Faculty coordinators", "Editorial board"],
      dateStarted: "January 2024"
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  
  // Filter logic
  const allTechnologies = [...new Set(displayProjects.flatMap(p => p.technologies))];
  const filters = ['All', 'Web Development', 'Healthcare', 'Content Management', 'Full Stack'];
  
  const filteredProjects = filter === 'All' 
    ? displayProjects 
    : displayProjects.filter(project => {
        if (filter === 'Web Development') return project.technologies.some(tech => 
          ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'].includes(tech)
        );
        if (filter === 'Healthcare') return project.name.toLowerCase().includes('health') || 
          project.name.toLowerCase().includes('cure');
        if (filter === 'Content Management') return project.technologies.some(tech => 
          ['WordPress', 'Content Management'].includes(tech)
        );
        if (filter === 'Full Stack') return project.technologies.some(tech => 
          ['Next.js', 'PHP', 'MySQL', 'API'].includes(tech)
        );
        return true;
      });

  const getProjectIcon = (project: Project) => {
    if (project.name.toLowerCase().includes('health') || project.name.toLowerCase().includes('cure')) return '🏥';
    if (project.name.toLowerCase().includes('portfolio')) return '💼';
    if (project.name.toLowerCase().includes('bulletin') || project.name.toLowerCase().includes('iqac')) return '📋';
    return '🚀';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'from-green-500 to-emerald-500';
      case 'ongoing': return 'from-blue-500 to-cyan-500';
      case 'planning': return 'from-orange-500 to-yellow-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Innovative solutions and creative projects that showcase my technical expertise
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === filterOption
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              className={`group relative glass-dark rounded-3xl p-6 transition-all duration-500 hover-lift ${
                hoveredProject === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getProjectIcon(project)}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(project.status)} text-white mt-1`}>
                      {project.status}
                    </div>
                  </div>
                </div>
                
                {/* Star Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-slate-600'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Highlights */}
              {project.highlights && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs"
                      >
                        ✨ {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-200 rounded-full text-xs font-medium border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 bg-slate-600/50 text-slate-300 rounded-full text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Meta */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{project.dateCompleted || project.dateStarted || '2024'}</span>
                </div>
                {project.collaborators && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{project.collaborators.length} team members</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                )}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in Collaboration?</h3>
            <p className="text-slate-300 mb-6">
              I'm always excited to work on innovative projects and explore new technologies. 
              Let's create something amazing together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover-lift transition-all duration-300"
              >
                Start a Project
              </a>
              <a
                href="https://github.com/rithan-dsouza"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all duration-300"
              >
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}