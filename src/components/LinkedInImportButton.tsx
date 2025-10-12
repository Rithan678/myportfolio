"use client";

import { Linkedin, Download } from "lucide-react";

interface LinkedInImportButtonProps {
  className?: string;
}

export default function LinkedInImportButton({ className = "" }: LinkedInImportButtonProps) {
  const handleImport = () => {
    // Redirect to LinkedIn OAuth
    window.location.href = "/api/linkedin/auth";
  };

  return (
    <button
      onClick={handleImport}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 ${className}`}
    >
      <Linkedin className="w-5 h-5" />
      <Download className="w-4 h-4" />
      Import from LinkedIn
    </button>
  );
}