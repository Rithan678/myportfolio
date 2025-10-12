"use client";

import { useState } from 'react';
import { ExternalLink, Users, TrendingUp, Award, Calendar, MapPin } from 'lucide-react';

interface LinkedInDataDisplayProps {
  profileData: any;
}

export default function LinkedInDataDisplay({ profileData }: LinkedInDataDisplayProps) {
  const [activeTab, setActiveTab] = useState('connections');

  if (!profileData || (profileData.importSource !== "enhanced_profile_data" && profileData.importSource !== "real_linkedin_data")) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">LinkedIn Profile Data</h2>
          <p className="text-slate-300 text-lg">
            Real-time data imported from LinkedIn profile
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm">
              <Users className="w-4 h-4" />
              <span>{profileData.connections?.totalConnections} connections</span>
            </div>
            <div className="flex items-center gap-2 bg-green-600/20 text-green-300 px-4 py-2 rounded-full text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{profileData.activities?.profileViews} profile views</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-700/50 rounded-lg p-1">
            {['connections', 'projects', 'recommendations', 'activities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Recent Connections */}
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Connections
                </h3>
                <div className="space-y-4">
                  {profileData.connections?.recentConnections?.map((connection: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {connection.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{connection.name}</div>
                        <div className="text-sm text-slate-300">{connection.title}</div>
                        <div className="text-xs text-slate-400">{connection.company}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          Connected {connection.connectionDate}
                        </div>
                      </div>
                      <div className="text-xs text-purple-400">
                        {connection.mutualConnections} mutual
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Breakdown */}
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Industry Breakdown</h3>
                <div className="space-y-3">
                  {Object.entries(profileData.connections?.industryBreakdown || {}).map(([industry, count]) => (
                    <div key={industry} className="flex justify-between items-center">
                      <span className="text-slate-300">{industry}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${(count as number / profileData.connections.totalConnections) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium w-8 text-right">{count as number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.projects?.map((project: any, index: number) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' 
                      ? 'bg-green-600/20 text-green-300'
                      : 'bg-blue-600/20 text-blue-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies?.slice(0, 4).map((tech: string, techIndex: number) => (
                    <span key={techIndex} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 4 && (
                    <span className="bg-slate-600/50 text-slate-300 px-2 py-1 rounded text-xs">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mb-3">
                  {project.projectUrl && (
                    <a 
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Project
                    </a>
                  )}
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                </div>

                <div className="text-xs text-slate-400">
                  {project.collaborators && `${project.collaborators.length} collaborators`}
                  {project.dateCompleted && ` • Completed ${project.dateCompleted}`}
                  {project.dateStarted && !project.dateCompleted && ` • Started ${project.dateStarted}`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="grid md:grid-cols-2 gap-6">
            {profileData.recommendations?.map((rec: any, index: number) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {rec.from.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{rec.from}</div>
                    <div className="text-sm text-slate-300">{rec.title}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {rec.date}
                    </div>
                  </div>
                </div>
                <blockquote className="text-slate-300 italic border-l-4 border-purple-500 pl-4">
                  "{rec.text}"
                </blockquote>
              </div>
            ))}
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{profileData.activities?.postsShared}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Posts Shared</h3>
              <p className="text-slate-300 text-sm">Content shared on LinkedIn</p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{profileData.activities?.articlesWritten}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Articles Written</h3>
              <p className="text-slate-300 text-sm">Professional articles published</p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{profileData.activities?.commentsAndLikes}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Engagement</h3>
              <p className="text-slate-300 text-sm">Comments and likes received</p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{profileData.activities?.searchAppearances}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Search Appearances</h3>
              <p className="text-slate-300 text-sm">Times appeared in searches</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}