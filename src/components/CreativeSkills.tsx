"use client";

import { useEffect, useState } from 'react';

interface CreativeSkillsProps {
  skills?: string[];
}

export default function CreativeSkills({ skills = [] }: CreativeSkillsProps) {
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  
  // Skill categories with proficiency levels
  const skillCategories = {
    "Programming Languages": {
      skills: ["JavaScript", "Python", "Java", "C/C++", "TypeScript", "PHP"],
      icon: "💻",
      color: "from-blue-500 to-cyan-500"
    },
    "Web Development": {
      skills: ["React", "Next.js", "Node.js", "HTML/CSS", "Bootstrap", "Tailwind CSS"],
      icon: "🌐", 
      color: "from-purple-500 to-pink-500"
    },
    "Database & Backend": {
      skills: ["MySQL", "Database Design", "API Development", "Server Management"],
      icon: "🗄️",
      color: "from-green-500 to-emerald-500"
    },
    "Professional Skills": {
      skills: ["Content Management", "Quality Assurance", "Project Management", "Team Collaboration"],
      icon: "👥",
      color: "from-orange-500 to-red-500"
    },
    "Tools & Platforms": {
      skills: ["Git/GitHub", "Vercel", "WordPress", "Canva", "Microsoft Office"],
      icon: "🛠️",
      color: "from-indigo-500 to-purple-500"
    }
  };

  // Animation effect for skills
  useEffect(() => {
    if (skills.length > 0) {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setVisibleSkills(prev => [...prev, skill]);
        }, index * 100);
      });
    }
  }, [skills]);

  // Get proficiency level based on skill type
  const getSkillLevel = (skill: string): number => {
    const programmingSkills = ["JavaScript", "Python", "HTML/CSS", "React"];
    const intermediateSkills = ["Java", "Node.js", "MySQL", "Git/GitHub"];
    const beginnerSkills = ["TypeScript", "PHP", "C/C++"];
    
    if (programmingSkills.includes(skill)) return 85;
    if (intermediateSkills.includes(skill)) return 70;
    if (beginnerSkills.includes(skill)) return 60;
    return 75; // Default level
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills &
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and professional capabilities
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {Object.entries(skillCategories).map(([category, data], categoryIndex) => (
            <div
              key={category}
              className="glass-dark rounded-3xl p-8 hover-lift"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${data.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {data.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{category}</h3>
                  <p className="text-slate-400">{data.skills.length} skills</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {data.skills.map((skill, skillIndex) => {
                  const isVisible = skills.length === 0 || visibleSkills.includes(skill);
                  const proficiency = getSkillLevel(skill);
                  
                  return (
                    <div
                      key={skill}
                      className={`transition-all duration-500 ${
                        isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
                      }`}
                      style={{ transitionDelay: `${skillIndex * 100}ms` }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill}</span>
                        <span className="text-slate-400 text-sm">{proficiency}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 bg-gradient-to-r ${data.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{
                            width: isVisible ? `${proficiency}%` : '0%',
                            transitionDelay: `${skillIndex * 150}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Skill Cloud */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-8">All Skills</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {skills.length > 0 ? skills.map((skill, index) => (
              <div
                key={skill}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 hover:scale-110 ${
                  visibleSkills.includes(skill)
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30'
                    : 'bg-slate-700/50 text-slate-400'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill}
              </div>
            )) : 
            // Default skills if no LinkedIn data
            Object.values(skillCategories).flatMap(cat => cat.skills).map((skill, index) => (
              <div
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30 transition-all duration-300 hover:scale-110 animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="mt-20 text-center">
          <div className="glass rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Currently Learning</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Machine Learning", "Cloud Computing", "DevOps", "Mobile Development", "AI Integration"].map((goal, index) => (
                <div
                  key={goal}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 border border-cyan-500/30 text-sm font-medium animate-pulse"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  🎯 {goal}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}