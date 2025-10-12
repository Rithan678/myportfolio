"use client";

import { useState } from 'react';
import { Linkedin, Download, ExternalLink } from "lucide-react";

interface PublicLinkedInImportProps {
  className?: string;
  onImport?: (data: any) => void;
}

export default function PublicLinkedInImport({ className = "", onImport }: PublicLinkedInImportProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("https://www.linkedin.com/in/rithan-dsouza-6a02b81ab");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleImport = async () => {
    if (!linkedinUrl.trim()) {
      alert("Please enter your LinkedIn profile URL");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/linkedin/fetch-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedinUrl: linkedinUrl.trim() }),
      });

      const data = await response.json();

      if (data.success && onImport) {
        onImport(data.profile);
      } else {
        throw new Error(data.error || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import LinkedIn profile. Please try again.');
    } finally {
      setIsLoading(false);
      setShowUrlInput(false);
    }
  };

  if (showUrlInput) {
    return (
      <div className="flex flex-col gap-3 max-w-md">
        <div className="flex gap-2">
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/your-profile"
            className="flex-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleImport}
            disabled={isLoading}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 ${
              isLoading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded font-medium transition-colors duration-200`}
          >
            <Linkedin className="w-4 h-4" />
            {isLoading ? 'Importing...' : 'Import'}
          </button>
          <button
            onClick={() => setShowUrlInput(false)}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowUrlInput(true)}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 ${className}`}
    >
      <Linkedin className="w-5 h-5" />
      <Download className="w-4 h-4" />
      Import LinkedIn Profile
    </button>
  );
}