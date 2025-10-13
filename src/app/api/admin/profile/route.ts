import { NextRequest, NextResponse } from "next/server";
import { PortfolioDB } from '@/lib/supabase';

// Transform database data to admin format
function transformToAdminFormat(dbData: { profile?: { first_name?: string; last_name?: string; headline?: string; summary?: string; location?: string; profile_image?: string; connections?: number }; skills?: { name: string }[]; certificates?: { id: string; name: string; issuer: string; issue_date: string; expiration_date?: string; credential_id?: string; credential_url?: string; description?: string; skills?: string[] }[]; projects?: { id: string; title: string; description?: string; url?: string; start_date?: string; end_date?: string; technologies?: string[]; status: string }[]; experience?: { id: string; title: string; company: string; location?: string; start_date: string; end_date?: string; description?: string; current: boolean }[] } | null) {
  if (!dbData) return null;

  return {
    firstName: dbData.profile?.first_name || 'Rithan',
    lastName: dbData.profile?.last_name || "D'Souza",
    headline: dbData.profile?.headline || 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
    summary: dbData.profile?.summary || '',
    location: dbData.profile?.location || 'Mangalore, Karnataka, India',
    profileImage: dbData.profile?.profile_image || '/images/rithan-profile.jpg',
    connections: dbData.profile?.connections || 150,
    skills: dbData.skills?.map((skill: { name: string }) => skill.name) || [],
    certificates: dbData.certificates?.map((cert: { id: string; name: string; issuer: string; issue_date: string; expiration_date?: string; credential_id?: string; credential_url?: string; description?: string; skills?: string[] }) => ({
      id: cert.id,
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issue_date,
      expirationDate: cert.expiration_date,
      credentialId: cert.credential_id,
      credentialUrl: cert.credential_url,
      description: cert.description,
      skills: cert.skills || []
    })) || [],
    projects: dbData.projects?.map((project: { id: string; title: string; description?: string; url?: string; start_date?: string; end_date?: string; technologies?: string[]; status: string }) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      url: project.url,
      startDate: project.start_date,
      endDate: project.end_date,
      technologies: project.technologies || [],
      status: project.status
    })) || [],
    experience: dbData.experience?.map((exp: { id: string; title: string; company: string; location?: string; start_date: string; end_date?: string; description?: string; current: boolean }) => ({
      id: exp.id,
      title: exp.title,
      company: exp.company,
      location: exp.location,
      startDate: exp.start_date,
      endDate: exp.end_date,
      description: exp.description,
      current: exp.current
    })) || []
  };
}

// GET - Load profile data from database
export async function GET() {
  try {
    console.log('🔍 Loading profile data from database...');
    
    // Check if database is available
    if (!PortfolioDB.isDatabaseAvailable()) {
      console.log('⚠️ Database not configured, returning fallback data');
      return NextResponse.json({
        firstName: 'Rithan',
        lastName: "D'Souza",
        headline: 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
        summary: 'Passionate BCA student with expertise in web development, focusing on modern technologies like React, Next.js, and TypeScript. Currently working as a Student Intern at IQAC Editorial Board while pursuing Bachelor\'s in Computer Applications.',
        location: 'Mangalore, Karnataka, India',
        profileImage: '/images/rithan-profile.jpg',
        connections: 150,
        skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
        certificates: [
          {
            id: '1',
            name: 'Web Development Foundations',
            issuer: 'LinkedIn Learning',
            issueDate: '2024-01-15',
            expirationDate: null,
            credentialId: 'WDF2024001',
            credentialUrl: 'https://linkedin.com/learning/certificates/web-development',
            description: 'Professional web development certification covering modern technologies.',
            skills: ['HTML5', 'CSS3', 'JavaScript', 'React']
          }
        ],
        projects: [
          {
            id: '1',
            title: 'Portfolio Website with LinkedIn Integration',
            description: 'Built a modern portfolio website using Next.js 15, TypeScript, and Tailwind CSS with real-time LinkedIn data integration.',
            url: 'https://github.com/rithan-dsouza/portfolio',
            startDate: '2024-10-01',
            endDate: '2024-10-12',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'LinkedIn API', 'Supabase'],
            status: 'completed'
          }
        ],
        experience: [
          {
            id: '1',
            title: 'Student Intern',
            company: 'IQAC Editorial Board',
            location: 'St Aloysius College, Mangalore',
            startDate: '2024-01-15',
            endDate: null,
            description: 'Contributing to editorial processes and content management for the Internal Quality Assurance Cell.',
            current: true
          }
        ]
      });
    }
    
    const completeProfile = await PortfolioDB.getCompleteProfile();
    
    if (!completeProfile) {
      console.log('⚠️ No profile found in database, returning empty structure');
      return NextResponse.json({
        firstName: 'Rithan',
        lastName: "D'Souza",
        headline: 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
        summary: '',
        location: 'Mangalore, Karnataka, India',
        profileImage: '/images/rithan-profile.jpg',
        connections: 150,
        skills: [],
        certificates: [],
        projects: [],
        experience: []
      });
    }

    const adminData = transformToAdminFormat(completeProfile);
    console.log('✅ Successfully loaded profile from database');
    
    return NextResponse.json(adminData);
  } catch (error) {
    console.error('❌ Error loading profile data:', error);
    return NextResponse.json({ error: 'Failed to load profile data' }, { status: 500 });
  }
}

// POST - Save complete profile data to database
export async function POST(request: NextRequest) {
  try {
    console.log('💾 Saving profile data to database...');
    const profileData = await request.json();
    
    // First, ensure profile exists and get/create it
    let profile = await PortfolioDB.getProfile();
    
    if (!profile) {
      profile = await PortfolioDB.upsertProfile({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        headline: profileData.headline,
        summary: profileData.summary,
        location: profileData.location,
        profile_image: profileData.profileImage,
        connections: profileData.connections
      });
    } else {
      // Update existing profile
      profile = await PortfolioDB.upsertProfile({
        id: profile.id,
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        headline: profileData.headline,
        summary: profileData.summary,
        location: profileData.location,
        profile_image: profileData.profileImage,
        connections: profileData.connections
      });
    }

    if (!profile) {
      throw new Error('Failed to create/update profile');
    }

    // Save skills
    if (profileData.skills && Array.isArray(profileData.skills)) {
      await PortfolioDB.upsertSkills(profile.id, profileData.skills);
    }

    // Save certificates
    if (profileData.certificates && Array.isArray(profileData.certificates)) {
      for (const cert of profileData.certificates) {
        await PortfolioDB.upsertCertificate({
          id: cert.id?.startsWith('temp_') ? undefined : cert.id,
          profile_id: profile.id,
          name: cert.name,
          issuer: cert.issuer,
          issue_date: cert.issueDate,
          expiration_date: cert.expirationDate,
          credential_id: cert.credentialId,
          credential_url: cert.credentialUrl,
          description: cert.description,
          skills: cert.skills || [],
          order_index: profileData.certificates.indexOf(cert) + 1
        });
      }
    }

    // Save projects
    if (profileData.projects && Array.isArray(profileData.projects)) {
      for (const project of profileData.projects) {
        await PortfolioDB.upsertProject({
          id: project.id?.startsWith('temp_') ? undefined : project.id,
          profile_id: profile.id,
          title: project.title,
          description: project.description,
          url: project.url,
          start_date: project.startDate,
          end_date: project.endDate,
          technologies: project.technologies || [],
          status: project.status || 'completed',
          order_index: profileData.projects.indexOf(project) + 1
        });
      }
    }

    // Save experience
    if (profileData.experience && Array.isArray(profileData.experience)) {
      for (const exp of profileData.experience) {
        await PortfolioDB.upsertExperience({
          id: exp.id?.startsWith('temp_') ? undefined : exp.id,
          profile_id: profile.id,
          title: exp.title,
          company: exp.company,
          location: exp.location,
          start_date: exp.startDate,
          end_date: exp.endDate,
          description: exp.description,
          current: exp.current || false,
          order_index: profileData.experience.indexOf(exp) + 1
        });
      }
    }

    console.log('✅ Successfully saved complete profile to database');
    return NextResponse.json({ success: true, message: 'Profile data saved successfully to database' });
    
  } catch (error) {
    console.error('❌ Error saving profile data:', error);
    return NextResponse.json({ 
      error: 'Failed to save profile data to database',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// DELETE - Delete specific items
export async function DELETE(request: NextRequest) {
  try {
    const { type, id } = await request.json();
    
    let success = false;
    
    switch (type) {
      case 'certificate':
        success = await PortfolioDB.deleteCertificate(id);
        break;
      case 'project':
        success = await PortfolioDB.deleteProject(id);
        break;
      case 'experience':
        success = await PortfolioDB.deleteExperience(id);
        break;
      default:
        return NextResponse.json({ error: 'Invalid delete type' }, { status: 400 });
    }

    if (success) {
      return NextResponse.json({ success: true, message: `${type} deleted successfully` });
    } else {
      return NextResponse.json({ error: `Failed to delete ${type}` }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}