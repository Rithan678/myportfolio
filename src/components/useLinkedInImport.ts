"use client";

import { useEffect, useState } from "react";

interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  profilePicture?: string;
  email: string;
  vanityName?: string;
}

export function useLinkedInImport() {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [profileData, setProfileData] = useState<LinkedInProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check URL parameters for LinkedIn import results (only on client-side)
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const linkedinImport = urlParams.get('linkedin_import');
    const data = urlParams.get('data');
    const errorParam = urlParams.get('error');

    if (linkedinImport === 'success' && data && typeof atob !== 'undefined') {
      try {
        const decodedData = JSON.parse(atob(data));
        setProfileData(decodedData);
        setImportStatus('success');
        
        // Clean up URL
        if (typeof window !== 'undefined') {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }
        
        console.log('LinkedIn profile imported:', decodedData);
      } catch (err) {
        console.error('Failed to parse LinkedIn data:', err);
        setError('Failed to process LinkedIn data');
        setImportStatus('error');
      }
    } else if (errorParam) {
      const errorMessages: Record<string, string> = {
        linkedin_auth_failed: 'LinkedIn authentication failed',
        no_code: 'LinkedIn authorization was cancelled',
        linkedin_processing_failed: 'Failed to process LinkedIn data',
      };
      
      setError(errorMessages[errorParam] || 'Unknown error occurred');
      setImportStatus('error');
      
      // Clean up URL
      if (typeof window !== 'undefined') {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  const clearStatus = () => {
    setImportStatus('idle');
    setProfileData(null);
    setError(null);
  };

  return {
    importStatus,
    profileData,
    error,
    clearStatus,
  };
}