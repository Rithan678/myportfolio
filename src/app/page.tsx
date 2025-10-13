"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [displayData, setDisplayData] = useState({
    firstName: 'Rithan',
    lastName: 'D\'Souza',
    headline: 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
    summary: 'Passionate BCA student with expertise in web development.',
    location: 'Mangalore, Karnataka, India',
    profileImage: '',
    connections: { totalConnections: 150 },
    skills: ['React.js', 'Next.js', 'TypeScript'],
    projects: [],
    experience: []
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          {displayData.firstName} {displayData.lastName}
        </h1>
        <p className="text-slate-300 text-xl mb-2">
          {displayData.headline}
        </p>
        <p className="text-slate-400">
          Portfolio is loading successfully!
        </p>
      </div>
    </div>
  );
}