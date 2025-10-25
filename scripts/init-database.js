#!/usr/bin/env node

/**
 * Database Initialization Script
 * This script populates your Supabase database with sample portfolio data
 * 
 * To use:
 * 1. Set up your Supabase project and get the URL and keys
 * 2. Update your .env.local file with Supabase credentials
 * 3. Run: node scripts/init-database.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration in .env.local');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function initializeDatabase() {
  console.log('🚀 Initializing portfolio database with sample data...');

  try {
    // 1. Insert/Update Profile
    console.log('📝 Creating profile...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: 'default_user',
        first_name: 'Rithan',
        last_name: 'D\'Souza',
        headline: 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
        summary: 'Passionate BCA student with expertise in web development, focusing on modern technologies like React, Next.js, and TypeScript. Currently working as a Student Intern at IQAC Editorial Board while pursuing Bachelor\'s in Computer Applications.',
        location: 'Mangalore, Karnataka, India',
        profile_image: '/images/rithan-profile.jpg',
        connections: 150
      })
      .select()
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      return;
    }

    console.log('✅ Profile created successfully');
    const profileId = profile.id;

    // 2. Insert Experience
    console.log('💼 Adding work experience...');
    const experiences = [
      {
        profile_id: profileId,
        title: 'Student Intern',
        company: 'IQAC Editorial Board',
        location: 'St Aloysius College, Mangalore',
        start_date: '2024-01-15',
        end_date: null,
        description: 'Contributing to editorial processes and content management for the Internal Quality Assurance Cell. Responsible for reviewing academic documents, maintaining quality standards, and assisting with accreditation processes.',
        current: true,
        order_index: 1
      },
      {
        profile_id: profileId,
        title: 'Web Development Volunteer',
        company: 'College Tech Club',
        location: 'St Aloysius College, Mangalore',
        start_date: '2023-08-01',
        end_date: '2023-12-31',
        description: 'Volunteered to develop and maintain the college tech club website. Organized coding workshops for junior students and helped with technical event coordination.',
        current: false,
        order_index: 2
      }
    ];

    const { error: expError } = await supabase
      .from('experience')
      .upsert(experiences);

    if (expError) {
      console.error('Experience error:', expError);
      return;
    }
    console.log('✅ Experience added successfully');

    // 3. Insert Certificates
    console.log('🏆 Adding certificates...');
    const certificates = [
      {
        profile_id: profileId,
        name: 'Web Development Foundations',
        issuer: 'LinkedIn Learning',
        issue_date: '2024-01-15',
        expiration_date: null,
        credential_id: 'WDF2024001',
        credential_url: 'https://linkedin.com/learning/certificates/web-development',
        description: 'Professional web development certification covering modern technologies, responsive design, and best practices for creating dynamic web applications.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
        order_index: 1
      },
      {
        profile_id: profileId,
        name: 'Next.js Development',
        issuer: 'Professional Development',
        issue_date: '2024-03-20',
        expiration_date: null,
        credential_id: 'NXT2024002',
        credential_url: null,
        description: 'Advanced certification in Next.js framework for building modern, performant web applications with server-side rendering and static site generation.',
        skills: ['Next.js', 'React', 'TypeScript', 'SSR'],
        order_index: 2
      },
      {
        profile_id: profileId,
        name: 'TypeScript Fundamentals',
        issuer: 'Microsoft Learn',
        issue_date: '2024-02-10',
        expiration_date: '2026-02-10',
        credential_id: 'TSF2024003',
        credential_url: 'https://docs.microsoft.com/learn/certifications/',
        description: 'Comprehensive certification in TypeScript programming, covering type safety, interfaces, generics, and advanced TypeScript patterns.',
        skills: ['TypeScript', 'JavaScript', 'Type Safety'],
        order_index: 3
      }
    ];

    const { error: certError } = await supabase
      .from('certificates')
      .upsert(certificates);

    if (certError) {
      console.error('Certificates error:', certError);
      return;
    }
    console.log('✅ Certificates added successfully');

    // 4. Insert Projects
    console.log('🚀 Adding projects...');
    const projects = [
      {
        profile_id: profileId,
        title: 'Portfolio Website with LinkedIn Integration',
        description: 'Built a modern portfolio website using Next.js 15, TypeScript, and Tailwind CSS with real-time LinkedIn data integration. Features include automatic certificate syncing, project showcase, admin panel for content management, and responsive design optimized for all devices.',
        url: 'https://github.com/Rithan678/myportfolio',
        start_date: '2024-10-01',
        end_date: '2024-10-12',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'LinkedIn API', 'Supabase'],
        status: 'completed',
        order_index: 1
      },
      {
        profile_id: profileId,
        title: 'Student Management System',
        description: 'Developed a comprehensive student management system as part of BCA curriculum. Implemented features for student registration, grade management, attendance tracking, and administrative functions with role-based access control.',
        url: null,
        start_date: '2024-08-15',
        end_date: '2024-09-30',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        status: 'completed',
        order_index: 2
      },
      {
        profile_id: profileId,
        title: 'E-learning Platform',
        description: 'Currently developing an interactive e-learning platform for college students with video streaming, assignment submission, real-time chat, and progress tracking features.',
        url: 'https://github.com/rithan-dsouza/elearning',
        start_date: '2024-09-01',
        end_date: '2024-12-15',
        technologies: ['Next.js', 'Socket.io', 'PostgreSQL', 'AWS'],
        status: 'ongoing',
        order_index: 3
      }
    ];

    const { error: projError } = await supabase
      .from('projects')
      .upsert(projects);

    if (projError) {
      console.error('Projects error:', projError);
      return;
    }
    console.log('✅ Projects added successfully');

    // 5. Insert Skills
    console.log('⚡ Adding skills...');
    const skills = [
      { profile_id: profileId, name: 'React.js', category: 'technical', proficiency: 4, order_index: 1 },
      { profile_id: profileId, name: 'Next.js', category: 'technical', proficiency: 4, order_index: 2 },
      { profile_id: profileId, name: 'TypeScript', category: 'technical', proficiency: 3, order_index: 3 },
      { profile_id: profileId, name: 'JavaScript', category: 'technical', proficiency: 4, order_index: 4 },
      { profile_id: profileId, name: 'Node.js', category: 'technical', proficiency: 3, order_index: 5 },
      { profile_id: profileId, name: 'HTML5', category: 'technical', proficiency: 5, order_index: 6 },
      { profile_id: profileId, name: 'CSS3', category: 'technical', proficiency: 4, order_index: 7 },
      { profile_id: profileId, name: 'Tailwind CSS', category: 'technical', proficiency: 4, order_index: 8 },
      { profile_id: profileId, name: 'Git', category: 'technical', proficiency: 3, order_index: 9 },
      { profile_id: profileId, name: 'PostgreSQL', category: 'technical', proficiency: 3, order_index: 10 },
      { profile_id: profileId, name: 'MongoDB', category: 'technical', proficiency: 3, order_index: 11 },
      { profile_id: profileId, name: 'Linux', category: 'technical', proficiency: 2, order_index: 12 },
      { profile_id: profileId, name: 'Docker', category: 'technical', proficiency: 2, order_index: 13 },
      { profile_id: profileId, name: 'AWS', category: 'technical', proficiency: 2, order_index: 14 },
      { profile_id: profileId, name: 'API Development', category: 'technical', proficiency: 3, order_index: 15 }
    ];

    const { error: skillsError } = await supabase
      .from('skills')
      .upsert(skills);

    if (skillsError) {
      console.error('Skills error:', skillsError);
      return;
    }
    console.log('✅ Skills added successfully');

    // 6. Verify data
    console.log('🔍 Verifying data insertion...');
    const verification = await Promise.all([
      supabase.from('profiles').select('*').eq('user_id', 'default_user'),
      supabase.from('experience').select('*').eq('profile_id', profileId),
      supabase.from('certificates').select('*').eq('profile_id', profileId),
      supabase.from('projects').select('*').eq('profile_id', profileId),
      supabase.from('skills').select('*').eq('profile_id', profileId)
    ]);

    console.log('📊 Data Summary:');
    console.log(`- Profiles: ${verification[0].data?.length || 0}`);
    console.log(`- Experience: ${verification[1].data?.length || 0}`);
    console.log(`- Certificates: ${verification[2].data?.length || 0}`);
    console.log(`- Projects: ${verification[3].data?.length || 0}`);
    console.log(`- Skills: ${verification[4].data?.length || 0}`);

    console.log('\n🎉 Database initialization completed successfully!');
    console.log('🌐 Your portfolio is now ready with sample data.');
    console.log('📝 Visit /admin to customize your information.');

  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
  }
}

// Run the initialization
initializeDatabase();