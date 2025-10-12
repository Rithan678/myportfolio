-- Sample Data for Portfolio Database
-- Run this after creating the schema

-- 1. Insert default profile
INSERT INTO profiles (
  user_id, 
  first_name, 
  last_name, 
  headline, 
  summary, 
  location, 
  profile_image, 
  connections
) VALUES (
  'default_user',
  'Rithan',
  'D''Souza',
  'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
  'Passionate BCA student with expertise in web development, focusing on modern technologies like React, Next.js, and TypeScript. Currently working as a Student Intern at IQAC Editorial Board while pursuing Bachelor''s in Computer Applications.',
  'Mangalore, Karnataka, India',
  '/images/rithan-profile.jpg',
  150
) ON CONFLICT (user_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  headline = EXCLUDED.headline,
  summary = EXCLUDED.summary,
  location = EXCLUDED.location,
  profile_image = EXCLUDED.profile_image,
  connections = EXCLUDED.connections,
  updated_at = NOW();

-- Get the profile ID for foreign key references
-- You'll need to replace 'profile_id_here' with the actual UUID after inserting profile

-- 2. Insert sample experience
INSERT INTO experience (profile_id, title, company, location, start_date, end_date, description, current, order_index)
SELECT 
  p.id,
  'Student Intern',
  'IQAC Editorial Board',
  'St Aloysius College, Mangalore',
  '2024-01-15'::date,
  NULL,
  'Contributing to editorial processes and content management for the Internal Quality Assurance Cell. Responsible for reviewing academic documents, maintaining quality standards, and assisting with accreditation processes.',
  true,
  1
FROM profiles p WHERE p.user_id = 'default_user';

INSERT INTO experience (profile_id, title, company, location, start_date, end_date, description, current, order_index)
SELECT 
  p.id,
  'Web Development Volunteer',
  'College Tech Club',
  'St Aloysius College, Mangalore',
  '2023-08-01'::date,
  '2023-12-31'::date,
  'Volunteered to develop and maintain the college tech club website. Organized coding workshops for junior students and helped with technical event coordination.',
  false,
  2
FROM profiles p WHERE p.user_id = 'default_user';

-- 3. Insert sample certificates
INSERT INTO certificates (profile_id, name, issuer, issue_date, expiration_date, credential_id, credential_url, description, skills, order_index)
SELECT 
  p.id,
  'Web Development Foundations',
  'LinkedIn Learning',
  '2024-01-15'::date,
  NULL,
  'WDF2024001',
  'https://linkedin.com/learning/certificates/web-development',
  'Professional web development certification covering modern technologies, responsive design, and best practices for creating dynamic web applications.',
  ARRAY['HTML5', 'CSS3', 'JavaScript', 'React'],
  1
FROM profiles p WHERE p.user_id = 'default_user';

INSERT INTO certificates (profile_id, name, issuer, issue_date, expiration_date, credential_id, credential_url, description, skills, order_index)
SELECT 
  p.id,
  'Next.js Development',
  'Professional Development',
  '2024-03-20'::date,
  NULL,
  'NXT2024002',
  NULL,
  'Advanced certification in Next.js framework for building modern, performant web applications with server-side rendering and static site generation.',
  ARRAY['Next.js', 'React', 'TypeScript', 'SSR'],
  2
FROM profiles p WHERE p.user_id = 'default_user';

INSERT INTO certificates (profile_id, name, issuer, issue_date, expiration_date, credential_id, credential_url, description, skills, order_index)
SELECT 
  p.id,
  'TypeScript Fundamentals',
  'Microsoft Learn',
  '2024-02-10'::date,
  '2026-02-10'::date,
  'TSF2024003',
  'https://docs.microsoft.com/learn/certifications/',
  'Comprehensive certification in TypeScript programming, covering type safety, interfaces, generics, and advanced TypeScript patterns.',
  ARRAY['TypeScript', 'JavaScript', 'Type Safety'],
  3
FROM profiles p WHERE p.user_id = 'default_user';

-- 4. Insert sample projects
INSERT INTO projects (profile_id, title, description, url, start_date, end_date, technologies, status, order_index)
SELECT 
  p.id,
  'Portfolio Website with LinkedIn Integration',
  'Built a modern portfolio website using Next.js 15, TypeScript, and Tailwind CSS with real-time LinkedIn data integration. Features include automatic certificate syncing, project showcase, admin panel for content management, and responsive design optimized for all devices.',
  'https://github.com/rithan-dsouza/portfolio',
  '2024-10-01'::date,
  '2024-10-12'::date,
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'LinkedIn API', 'Supabase'],
  'completed',
  1
FROM profiles p WHERE p.user_id = 'default_user';

INSERT INTO projects (profile_id, title, description, url, start_date, end_date, technologies, status, order_index)
SELECT 
  p.id,
  'Student Management System',
  'Developed a comprehensive student management system as part of BCA curriculum. Implemented features for student registration, grade management, attendance tracking, and administrative functions with role-based access control.',
  NULL,
  '2024-08-15'::date,
  '2024-09-30'::date,
  ARRAY['React', 'Node.js', 'MongoDB', 'Express'],
  'completed',
  2
FROM profiles p WHERE p.user_id = 'default_user';

INSERT INTO projects (profile_id, title, description, url, start_date, end_date, technologies, status, order_index)
SELECT 
  p.id,
  'E-learning Platform',
  'Currently developing an interactive e-learning platform for college students with video streaming, assignment submission, real-time chat, and progress tracking features.',
  'https://github.com/rithan-dsouza/elearning',
  '2024-09-01'::date,
  '2024-12-15'::date,
  ARRAY['Next.js', 'Socket.io', 'PostgreSQL', 'AWS'],
  'ongoing',
  3
FROM profiles p WHERE p.user_id = 'default_user';

-- 5. Insert sample skills
INSERT INTO skills (profile_id, name, category, proficiency, order_index)
SELECT p.id, skill_name, 'technical', proficiency, row_number
FROM profiles p 
CROSS JOIN (
  VALUES 
    ('React.js', 4, 1),
    ('Next.js', 4, 2),
    ('TypeScript', 3, 3),
    ('JavaScript', 4, 4),
    ('Node.js', 3, 5),
    ('HTML5', 5, 6),
    ('CSS3', 4, 7),
    ('Tailwind CSS', 4, 8),
    ('Git', 3, 9),
    ('PostgreSQL', 3, 10),
    ('MongoDB', 3, 11),
    ('Linux', 2, 12),
    ('Docker', 2, 13),
    ('AWS', 2, 14),
    ('API Development', 3, 15)
) AS skills_data(skill_name, proficiency, row_number)
WHERE p.user_id = 'default_user';

-- 6. Verify data insertion
SELECT 'Profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'Experience', COUNT(*) FROM experience
UNION ALL
SELECT 'Certificates', COUNT(*) FROM certificates
UNION ALL
SELECT 'Projects', COUNT(*) FROM projects
UNION ALL
SELECT 'Skills', COUNT(*) FROM skills;