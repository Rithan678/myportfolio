"use client";

import { useState, useEffect } from 'react';
import LinkedInDataDisplay from '@/components/LinkedInDataDisplay';
import CreativeSkills from '@/components/CreativeSkills';
import CreativeProjects from '@/components/CreativeProjects';
import { useLinkedInImport } from '@/components/useLinkedInImport';

export default function Home() {
  const { importStatus, profileData, error, clearStatus } = useLinkedInImport();
  const [linkedinData, setLinkedinData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Auto-load profile data (admin data takes priority over LinkedIn)
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setIsLoading(true);
        
        // First try to load admin-managed data from database
        const adminResponse = await fetch('/api/admin/profile', {
          method: 'GET',
          cache: 'no-store',
        });

        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          // Transform admin data to portfolio format
          const portfolioData = {
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            headline: adminData.headline,
            summary: adminData.summary,
            location: adminData.location,
            profileImage: adminData.profileImage,
            connections: { totalConnections: adminData.connections },
            skills: adminData.skills,
            certifications: adminData.certificates,
            projects: adminData.projects,
            experience: adminData.experience,
            profileUrl: "https://www.linkedin.com/in/rithan-dsouza-6a02b81ab/",
            importSource: "database_admin_panel",
            lastUpdated: new Date().toISOString()
          };
          setLinkedinData(portfolioData);
          console.log('✅ Loaded admin-managed profile data from database');
          return;
        }

        // Fallback to LinkedIn integration if admin data fails
        const linkedinResponse = await fetch('/api/linkedin/auto-import', {
          method: 'GET',
          cache: 'no-store',
        });

        const linkedinData = await linkedinResponse.json();

        if (linkedinData.success) {
          setLinkedinData(linkedinData.profile);
          console.log('✅ Loaded LinkedIn profile data as fallback');
        } else {
          throw new Error(linkedinData.error || 'Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Profile loading failed:', error);
        setLoadError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  // Use real LinkedIn data or fallback to OAuth data
  const displayData = linkedinData || profileData;

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Show error state if there's a load error
  if (loadError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error loading portfolio</p>
          <p className="text-white">{loadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + (i % 10)}s`
            }}
          ></div>
        ))}
      </div>

      {/* Loading Status with Creative Design */}
      {isLoading && (
        <div className="fixed top-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <div className="absolute inset-0 animate-ping w-5 h-5 border border-white rounded-full opacity-20"></div>
            </div>
            <span className="font-medium">Syncing LinkedIn data...</span>
          </div>
        </div>
      )}
      
      {loadError && (
        <div className="fixed top-6 right-6 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠</span>
            <span className="font-medium">{loadError}</span>
          </div>
        </div>
      )}
      
      {linkedinData && (
        <div className="fixed top-6 right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 backdrop-blur-sm border border-white/20 animate-slideIn">
          <div className="flex items-center gap-3">
            <span className="text-xl">✨</span>
            <span className="font-medium">LinkedIn data synchronized!</span>
          </div>
        </div>
      )}

      {/* Creative Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/60 backdrop-blur-xl z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">
                  {displayData?.firstName?.[0] || 'R'}{displayData?.lastName?.[0] || 'D'}
                </span>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {displayData?.firstName || 'Rithan'} {displayData?.lastName || 'D\'Souza'}
                </div>
                <div className="text-sm text-slate-400">
                  {displayData?.headline?.split('|')[0] || 'BCA Student'}
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-1 items-center">
              {['About', 'Skills', 'Certifications', 'Projects', 'Network', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm relative group"
                >
                  {item}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
              
              {/* Admin Link */}
              <a
                href="/admin"
                className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
                title="Edit Profile"
              >
                ⚙️ Admin
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Creative Hero Section */}
      <section className="relative pt-32 pb-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            
            {/* Animated Profile Image */}
            <div className="mb-12 relative">
              <div className="w-48 h-48 mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full flex items-center justify-center">
                  {displayData?.profileImage ? (
                    <img 
                      src={displayData.profileImage} 
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover border-4 border-white/20"
                    />
                  ) : (
                    <span className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {displayData?.firstName?.[0] || 'R'}{displayData?.lastName?.[0] || 'D'}
                    </span>
                  )}
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
                  Available
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                  {displayData?.connections?.totalConnections || '284'} connections
                </div>
              </div>
            </div>

            {/* Animated Name */}
            <div className="mb-8 overflow-hidden">
              <h1 className="text-6xl md:text-8xl font-black mb-4 animate-slideUp">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  {displayData?.firstName || 'Rithan'}
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {displayData?.lastName || "D'Souza"}
                </span>
              </h1>
            </div>

            {/* Animated Status Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl animate-glow">
                <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                #OPEN_TO_WORK
              </div>
            </div>

            {/* Animated Headline */}
            <div className="mb-8">
              <p className="text-2xl md:text-3xl text-slate-300 mb-6 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
                {displayData?.headline || 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board'}
              </p>
            </div>
            {/* Stats Row */}
            <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{displayData?.connections?.totalConnections || '284'}</div>
                <div className="text-sm text-slate-400">Connections</div>
              </div>
              <div className="w-px h-12 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{displayData?.projects?.length || '3'}</div>
                <div className="text-sm text-slate-400">Projects</div>
              </div>
              <div className="w-px h-12 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{displayData?.skills?.length || '20+'}</div>
                <div className="text-sm text-slate-400">Skills</div>
              </div>
            </div>

            <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto">
              {displayData?.summary?.substring(0, 200) || 
                'Passionate about technology, creative design, and building innovative solutions. Currently pursuing BCA while gaining hands-on experience in software development and quality assurance.'
              }
              {displayData?.summary?.length > 200 && '...'}
            </p>

            {/* Creative CTAs */}
            <div className="flex flex-wrap justify-center gap-6">
              {/* LinkedIn CTA */}
              <a
                href={displayData?.profileUrl || "https://www.linkedin.com/in/rithan-dsouza-6a02b81ab"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold transition-all duration-300 hover-lift shadow-2xl"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>View LinkedIn</span>
                </div>
              </a>

              {/* Projects CTA */}
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold transition-all duration-300 hover-lift shadow-2xl"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2-2 2m0 8l2 2-2 2M5 13v6a1 1 0 001 1h12a1 1 0 001-1v-6M5 7v6"/>
                  </svg>
                  <span>Explore Projects</span>
                </div>
              </a>

              {/* Contact CTA */}
              <a
                href="#contact"
                className="group relative px-8 py-4 glass-dark text-white rounded-2xl font-semibold transition-all duration-300 hover-lift border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span>Let's Connect</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
            {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-slate-300 text-lg max-w-4xl mx-auto">
              {displayData?.summary || 
                `I am a Bachelor of Computer Applications (BCA) student at St Aloysius College, Mangaluru, 
                with hands-on experience as an intern in the IQAC department's Editorial Board. My internship 
                has helped me develop strong content management, coordination, and organizational skills. 
                Alongside academics, I am passionate about technology, creative design, and building a 
                strong foundation in IT and software development. I aim to grow as a professional who can 
                combine technical knowledge with excellent communication and teamwork skills.`
              }
            </p>
            {displayData && displayData.importSource === "enhanced_profile_data" && (
              <div className="mt-6 inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm">
                <span>🔗</span>
                <span>Data imported from LinkedIn profile</span>
                <span>•</span>
                <span>{displayData.skills?.length} skills</span>
                <span>•</span>
                <span>{displayData.projects?.length} projects</span>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-slate-700/50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">BCA</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Currently Pursuing</h3>
              <p className="text-slate-300">Bachelor of Computer Applications at St. Aloysius College</p>
            </div>
            <div className="text-center p-6 bg-slate-700/50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">284</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn Connections</h3>
              <p className="text-slate-300">Building professional network and relationships</p>
            </div>
            <div className="text-center p-6 bg-slate-700/50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Months Experience</h3>
              <p className="text-slate-300">Student Intern at IQAC Editorial Board</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          </div>
          
          <div className="space-y-8">
            {/* Current Experience */}
            <div className="bg-slate-800/50 rounded-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">SA</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-white mb-2">Student Intern – IQAC Editorial Board</h3>
                  <p className="text-purple-400 mb-2">St. Aloysius (Deemed to be University) · Internship</p>
                  <p className="text-slate-400 mb-4">Aug 2025 - Present · 3 months · Mangalore · On-site</p>
                  <ul className="text-slate-300 space-y-2">
                    <li>• Assisted in editing and publishing newsletters and reports for the IQAC Editorial Board</li>
                    <li>• Collaborated with faculty and students for editorial content</li>
                    <li>• Gained experience in teamwork, content management, and communication</li>
                    <li>• Developed poster design and creativity skills</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Education</h2>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">SA</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">St. Aloysius (Deemed to be University)</h3>
                <p className="text-purple-400 mb-2">Bachelor of Computer Applications · Computer Applications</p>
                <p className="text-slate-400 mb-4">Jul 2023 - Present</p>
                <p className="text-slate-300 mb-2"><strong>Activities:</strong> IQAC Editorial Board (Student Intern)</p>
                <p className="text-slate-300">
                  Currently pursuing BCA with a focus on programming, software development, and IT fundamentals. 
                  Active as a Student Intern in the IQAC Editorial Board, gaining experience in content editing, 
                  teamwork, and coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Professional Experience</h2>
            <p className="text-slate-300 text-lg">
              My journey in software development and the roles that have shaped my career.
            </p>
          </div>
          <div className="space-y-8">
            {/* Add your actual experience here based on LinkedIn profile */}
            <div className="bg-slate-800/50 rounded-lg p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Software Developer</h3>
                  <p className="text-blue-400">Your Current/Recent Company</p>
                </div>
                <div className="text-slate-400">
                  Present - Current
                </div>
              </div>
              <ul className="text-slate-300 space-y-2">
                <li>• Developed and maintained web applications using React, Node.js, and TypeScript</li>
                <li>• Collaborated with cross-functional teams to deliver high-quality software solutions</li>
                <li>• Implemented responsive design principles and modern UI/UX practices</li>
                <li>• Optimized application performance and user experience</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Previous Role</h3>
                  <p className="text-blue-400">Previous Company</p>
                </div>
                <div className="text-slate-400">
                  Year - Year
                </div>
              </div>
              <ul className="text-slate-300 space-y-2">
                <li>• Built scalable web applications and APIs</li>
                <li>• Worked with databases and cloud technologies</li>
                <li>• Participated in code reviews and agile development processes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Creative Skills Component */}
      <CreativeSkills skills={displayData?.skills} />

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Certifications & Achievements
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Professional certifications and achievements showcasing expertise and commitment to continuous learning
            </p>
          </div>
          
          {displayData?.certifications && displayData.certifications.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayData.certifications.map((cert: any, index: number) => (
              <div key={index} className="glass-card p-6 group hover:scale-105 transition-all duration-500 border border-slate-600/30 hover:border-blue-500/50">
                {/* Certificate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-shadow duration-500">
                      <span className="text-2xl font-bold text-white">
                        {cert.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors leading-tight">
                        {cert.name}
                      </h4>
                      <p className="text-slate-400 text-sm">{cert.issuer} · {cert.issueDate}</p>
                      {cert.expirationDate && (
                        <p className="text-yellow-400 text-xs">Expires: {cert.expirationDate}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certificate Description */}
                <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {cert.description}
                </p>

                {/* Credential Information */}
                <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-600/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Credential ID</span>
                    <span className="text-xs text-blue-300 font-mono">{cert.credentialId}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Certificate
                      </a>
                    )}
                    
                    {cert.linkedinUrl && (
                      <a 
                        href={cert.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white text-xs rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills?.map((skill: string, skillIndex: number) => (
                    <span 
                      key={skillIndex}
                      className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 hover:bg-purple-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            </div>
          ) : (
            /* No Certificates Found - Show LinkedIn Integration Message */
            <div className="text-center py-16">
              <div className="glass-card p-8 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  LinkedIn Certificates Not Synced Yet
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  This portfolio automatically displays certificates from your LinkedIn profile. 
                  To show your certifications here:
                </p>
                <div className="text-left space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div className="text-slate-300">
                      <strong className="text-white">Add certificates to your LinkedIn profile</strong><br/>
                      Go to LinkedIn → Add profile section → Licenses & certifications
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div className="text-slate-300">
                      <strong className="text-white">Include credential URLs</strong><br/>
                      Add direct links to your certificates for verification
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div className="text-slate-300">
                      <strong className="text-white">Refresh or wait for auto-sync</strong><br/>
                      Use the button below or wait for automatic sync within 1 hour
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <a 
                    href="https://www.linkedin.com/in/rithan-dsouza-6a02b81ab/details/certifications/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Add Certificates on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {/* Auto-refresh Notice & Manual Refresh */}
          <div className="mt-16 text-center space-y-4">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-6 py-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm font-medium">
                Certifications automatically sync from LinkedIn profile
              </span>
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            
            <button
              onClick={async () => {
                setIsLoading(true);
                try {
                  const response = await fetch('/api/linkedin/auto-import', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ linkedinUrl: 'https://www.linkedin.com/in/rithan-dsouza-6a02b81ab' }),
                  });
                  const data = await response.json();
                  if (data.success) {
                    setLinkedinData(data.profile);
                  }
                } catch (error) {
                  console.error('Manual refresh failed:', error);
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Syncing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh LinkedIn Data
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Use Creative Projects Component */}
      <CreativeProjects projects={displayData?.projects} />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
            <p className="text-slate-300 text-lg">
              Interested in working together? Let's discuss your project.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-700/50 rounded-lg p-8 text-center">
              <div className="grid md:grid-cols-2 gap-6">
                <a
                  href="https://www.linkedin.com/in/rithan-dsouza-6a02b81ab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                >
                  <div className="text-2xl mb-2">💼</div>
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-sm opacity-90">Professional Network</div>
                </a>
                <a
                  href="mailto:rithan.dsouza@email.com"
                  className="p-4 bg-slate-600 hover:bg-slate-500 rounded-lg text-white transition-colors"
                >
                  <div className="text-2xl mb-2">📧</div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm opacity-90">Direct Contact</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Network Section */}
      <section id="network">
        <LinkedInDataDisplay profileData={displayData} />
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400">
            <p>&copy; 2025 Rithan D'Souza. All rights reserved.</p>
            <p className="mt-2">
              <a 
                href="https://www.linkedin.com/in/rithan-dsouza-6a02b81ab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                Connect with me on LinkedIn
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
