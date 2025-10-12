"use client";

import { useState } from 'react';
import { Linkedin, Download } from "lucide-react";

interface LinkedInImportButtonProps {
  className?: string;
  onImport?: (mockData: any) => void;
}

export default function MockLinkedInImportButton({ className = "", onImport }: LinkedInImportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleMockImport = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock LinkedIn data
    const mockLinkedInData = {
      id: "mock-linkedin-id",
      firstName: "Rithan",
      lastName: "D'Souza", 
      headline: "BCA Student | Aspiring Software Developer | Tech Enthusiast",
      email: "rithan.dsouza@example.com",
      vanityName: "rithan-dsouza",
      profilePicture: null
    };

    if (onImport) {
      onImport(mockLinkedInData);
    }
    
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleMockImport}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-6 py-3 ${
        isLoading 
          ? 'bg-gray-500 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white rounded-lg font-medium transition-colors duration-200 ${className}`}
    >
      <Linkedin className="w-5 h-5" />
      <Download className="w-4 h-4" />
      {isLoading ? 'Importing...' : 'Demo: Import from LinkedIn'}
    </button>
  );
}