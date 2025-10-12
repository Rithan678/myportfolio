"use client";

import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  description: string;
  skills: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  url: string | null;
  startDate: string;
  endDate: string;
  technologies: string[];
  status: 'completed' | 'ongoing' | 'planned';
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  location: string;
  profileImage: string;
  connections: number;
  skills: string[];
  certificates: Certificate[];
  projects: Project[];
  experience: Experience[];
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Rithan',
    lastName: "D'Souza",
    headline: 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
    summary: 'Passionate BCA student with expertise in web development, focusing on modern technologies like React, Next.js, and TypeScript.',
    location: 'Mangalore, Karnataka, India',
    profileImage: '/images/rithan-profile.jpg',
    connections: 150,
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js'],
    certificates: [],
    projects: [],
    experience: []
  });
  
  const [editingCert, setEditingCert] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingExperience, setEditingExperience] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load existing data
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await fetch('/api/admin/profile');
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      }
    } catch (error) {
      console.error('Failed to load profile data:', error);
    }
  };

  const saveProfileData = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (response.ok) {
        setSaveMessage('✅ Profile saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('❌ Failed to save profile');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving profile');
    }
    setIsSaving(false);
  };

  // Certificate functions
  const addCertificate = () => {
    const newCert: Certificate = {
      id: `temp_${Date.now()}`, // Temporary ID for new certificates
      name: '',
      issuer: '',
      issueDate: new Date().toISOString().split('T')[0],
      expirationDate: null,
      credentialId: null,
      credentialUrl: null,
      description: '',
      skills: []
    };
    setProfileData(prev => ({
      ...prev,
      certificates: [...prev.certificates, newCert]
    }));
    setEditingCert(newCert.id);
  };

  const updateCertificate = (id: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      certificates: prev.certificates.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const deleteCertificate = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(cert => cert.id !== id)
    }));
  };

  // Project functions
  const addProject = () => {
    const newProject: Project = {
      id: `temp_${Date.now()}`, // Temporary ID for new projects
      title: '',
      description: '',
      url: null,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      technologies: [],
      status: 'ongoing'
    };
    setProfileData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
    setEditingProject(newProject.id);
  };

  const updateProject = (id: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const deleteProject = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  // Experience functions
  const addExperience = () => {
    const newExp: Experience = {
      id: `temp_${Date.now()}`, // Temporary ID for new experience
      title: '',
      company: '',
      location: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: null,
      description: '',
      current: true
    };
    setProfileData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
    setEditingExperience(newExp.id);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const deleteExperience = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Portfolio Admin</h1>
              <p className="text-slate-300 mt-1">Manage your profile like LinkedIn</p>
            </div>
            <div className="flex items-center space-x-4">
              {saveMessage && (
                <span className="text-sm text-green-400">{saveMessage}</span>
              )}
              <button
                onClick={saveProfileData}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800/30 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', name: 'Profile', icon: '👤' },
              { id: 'experience', name: 'Experience', icon: '💼' },
              { id: 'certificates', name: 'Certificates', icon: '🏆' },
              { id: 'projects', name: 'Projects', icon: '🚀' },
              { id: 'skills', name: 'Skills', icon: '⚡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && (
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Professional Headline</label>
                <input
                  type="text"
                  value={profileData.headline}
                  onChange={(e) => setProfileData(prev => ({ ...prev, headline: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., BCA Student at St Aloysius College | Web Developer"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Summary</label>
                <textarea
                  rows={4}
                  value={profileData.summary}
                  onChange={(e) => setProfileData(prev => ({ ...prev, summary: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a brief summary about yourself..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Connections</label>
                <input
                  type="number"
                  value={profileData.connections}
                  onChange={(e) => setProfileData(prev => ({ ...prev, connections: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Certifications</h2>
              <button
                onClick={addCertificate}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Certificate</span>
              </button>
            </div>

            <div className="space-y-6">
              {profileData.certificates.map((cert) => (
                <div key={cert.id} className="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
                  {editingCert === cert.id ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Certificate Name</label>
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                            placeholder="e.g., AWS Certified Developer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Issuing Organization</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                            placeholder="e.g., Amazon Web Services"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Issue Date</label>
                          <input
                            type="date"
                            value={cert.issueDate}
                            onChange={(e) => updateCertificate(cert.id, 'issueDate', e.target.value)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Expiration Date (Optional)</label>
                          <input
                            type="date"
                            value={cert.expirationDate || ''}
                            onChange={(e) => updateCertificate(cert.id, 'expirationDate', e.target.value || null)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Credential ID (Optional)</label>
                          <input
                            type="text"
                            value={cert.credentialId || ''}
                            onChange={(e) => updateCertificate(cert.id, 'credentialId', e.target.value || null)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Credential URL (Optional)</label>
                          <input
                            type="url"
                            value={cert.credentialUrl || ''}
                            onChange={(e) => updateCertificate(cert.id, 'credentialUrl', e.target.value || null)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                        <textarea
                          rows={3}
                          value={cert.description}
                          onChange={(e) => updateCertificate(cert.id, 'description', e.target.value)}
                          className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                          placeholder="Describe what this certification demonstrates..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingCert(null)}
                          className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                          <CheckIcon className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => deleteCertificate(cert.id)}
                          className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{cert.name || 'Untitled Certificate'}</h3>
                        <p className="text-slate-300">{cert.issuer} • {cert.issueDate}</p>
                        {cert.description && <p className="text-slate-400 mt-2">{cert.description}</p>}
                      </div>
                      <button
                        onClick={() => setEditingCert(cert.id)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {profileData.certificates.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <span className="text-4xl mb-4 block">🏆</span>
                  <p>No certificates added yet. Click "Add Certificate" to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Similar sections for projects, experience, and skills will be rendered here */}
        {activeTab === 'projects' && (
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
              <button
                onClick={addProject}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-6">
              {profileData.projects.map((project) => (
                <div key={project.id} className="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
                  {editingProject === project.id ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-300 mb-2">Project Title</label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                            placeholder="e.g., E-commerce Website"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                          <input
                            type="date"
                            value={project.startDate}
                            onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                          <input
                            type="date"
                            value={project.endDate}
                            onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-300 mb-2">Project URL (Optional)</label>
                          <input
                            type="url"
                            value={project.url || ''}
                            onChange={(e) => updateProject(project.id, 'url', e.target.value || null)}
                            className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                        <textarea
                          rows={4}
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white"
                          placeholder="Describe the project, technologies used, and your role..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProject(null)}
                          className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                          <CheckIcon className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.title || 'Untitled Project'}</h3>
                        <p className="text-slate-300">{project.startDate} - {project.endDate}</p>
                        {project.description && <p className="text-slate-400 mt-2">{project.description.slice(0, 150)}...</p>}
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
                            View Project →
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => setEditingProject(project.id)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {profileData.projects.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <span className="text-4xl mb-4 block">🚀</span>
                  <p>No projects added yet. Click "Add Project" to showcase your work.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h2>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Skills (comma-separated)
              </label>
              <textarea
                rows={4}
                value={profileData.skills.join(', ')}
                onChange={(e) => setProfileData(prev => ({
                  ...prev,
                  skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                }))}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React.js, Next.js, TypeScript, JavaScript, Node.js, Python..."
              />
              <p className="text-slate-400 text-sm mt-2">
                Add your technical skills, programming languages, frameworks, and tools.
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Current Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}