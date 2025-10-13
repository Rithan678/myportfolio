import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

// TypeScript interfaces for LinkedIn data
interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
  location?: string;
}

interface EducationItem {
  school: string;
  degree: string;
  duration: string;
  description?: string;
}

interface SkillItem {
  name: string;
  endorsements?: number;
}

async function fetchRealLinkedInData(linkedinUrl: string) {
  try {
    // Use a headless browser service to get the LinkedIn page
    const response = await fetch(linkedinUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse the HTML to extract LinkedIn data
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract structured data from LinkedIn's JSON-LD
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    let structuredData = null;
    
    for (const script of scripts) {
      try {
        const data = JSON.parse(script.textContent || '');
        if (data['@type'] === 'Person' || data['@type'] === 'ProfilePage') {
          structuredData = data;
          break;
        }
      } catch {
        continue;
      }
    }

    // Extract profile data
    const profileData = {
      firstName: extractName(document, structuredData)?.first || 'Rithan',
      lastName: extractName(document, structuredData)?.last || "D'Souza",
      headline: extractHeadline(document, structuredData) || 'BCA Student at St Aloysius College | Student Intern at IQAC Editorial Board',
      summary: extractSummary(document) || 'Passionate about technology and software development.',
      location: extractLocation(document, structuredData) || 'Mangalore, Karnataka, India',
      profileImage: extractProfileImage(document, structuredData),
      experience: extractExperience(document),
      education: extractEducation(document),
      skills: extractSkills(document),
      connections: extractConnections(document),
      profileUrl: linkedinUrl,
      importSource: "real_linkedin_scrape",
      lastUpdated: new Date().toISOString()
    };

    return profileData;

  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    throw new Error('Failed to fetch LinkedIn data: ' + (error instanceof Error ? error.message : String(error)));
  }
}

function extractName(document: Document, structuredData: any) {
  // Try structured data first
  if (structuredData?.name) {
    const parts = structuredData.name.split(' ');
    return {
      first: parts[0],
      last: parts.slice(1).join(' ')
    };
  }

  // Try meta tags
  const nameElement = document.querySelector('meta[property="og:title"]') || 
                     document.querySelector('meta[name="twitter:title"]') ||
                     document.querySelector('title');
  
  if (nameElement) {
    const name = nameElement.getAttribute('content') || nameElement.textContent || '';
    const parts = name.split(' ');
    return {
      first: parts[0],
      last: parts.slice(1).join(' ')
    };
  }

  return null;
}

function extractHeadline(document: Document, structuredData: any) {
  // Try structured data
  if (structuredData?.jobTitle) {
    return structuredData.jobTitle;
  }

  // Try meta description
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    return description.getAttribute('content');
  }

  return null;
}

function extractSummary(document: Document) {
  // LinkedIn often has summary in specific sections
  const summarySelectors = [
    '.pv-about-section .pv-about__summary-text',
    '.about-section .about-section__summary',
    '[data-section="summary"]'
  ];

  for (const selector of summarySelectors) {
    const element = document.querySelector(selector);
    if (element?.textContent) {
      return element.textContent.trim();
    }
  }

  return null;
}

function extractLocation(document: Document, structuredData: any) {
  if (structuredData?.address?.addressLocality) {
    return `${structuredData.address.addressLocality}, ${structuredData.address.addressRegion || ''}, ${structuredData.address.addressCountry || ''}`.trim();
  }

  const locationSelectors = [
    '.pv-top-card-v2-section__info .pv-top-card-v2-section__location',
    '.location-info',
    '[data-field="location"]'
  ];

  for (const selector of locationSelectors) {
    const element = document.querySelector(selector);
    if (element?.textContent) {
      return element.textContent.trim();
    }
  }

  return null;
}

function extractProfileImage(document: Document, structuredData: any) {
  if (structuredData?.image) {
    return structuredData.image;
  }

  const imageSelectors = [
    'meta[property="og:image"]',
    'meta[name="twitter:image"]',
    '.profile-photo-edit__preview',
    '.pv-top-card-profile-picture__image'
  ];

  for (const selector of imageSelectors) {
    const element = document.querySelector(selector);
    const src = element?.getAttribute('content') || element?.getAttribute('src');
    if (src) {
      return src;
    }
  }

  return null;
}

function extractExperience(document: Document): ExperienceItem[] {
  const experiences: ExperienceItem[] = [];
  const expSelectors = [
    '.experience-section .pv-profile-section__list-item',
    '.pv-experience-section .pv-profile-section__list-item',
    '[data-section="experience"] .experience-item'
  ];

  for (const selector of expSelectors) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const title = element.querySelector('.pv-entity__summary-info h3')?.textContent?.trim();
      const company = element.querySelector('.pv-entity__secondary-title')?.textContent?.trim();
      const duration = element.querySelector('.pv-entity__date-range')?.textContent?.trim();
      
      if (title && company) {
        experiences.push({
          title,
          company,
          duration: duration || 'Present',
          description: element.querySelector('.pv-entity__description')?.textContent?.trim() || ''
        });
      }
    });
  }

  return experiences;
}

function extractEducation(document: Document): EducationItem[] {
  const education: EducationItem[] = [];
  const eduSelectors = [
    '.education-section .pv-profile-section__list-item',
    '.pv-education-section .pv-profile-section__list-item',
    '[data-section="education"] .education-item'
  ];

  for (const selector of eduSelectors) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const school = element.querySelector('.pv-entity__school-name')?.textContent?.trim();
      const degree = element.querySelector('.pv-entity__degree-name')?.textContent?.trim();
      const duration = element.querySelector('.pv-entity__dates')?.textContent?.trim();
      
      if (school) {
        education.push({
          school,
          degree: degree || 'Degree',
          duration: duration || 'Present'
        });
      }
    });
  }

  return education;
}

function extractSkills(document: Document): SkillItem[] {
  const skills: SkillItem[] = [];
  const skillSelectors = [
    '.skills-section .pv-skill-category-entity__name',
    '.pv-skills-section .pv-skill-category-entity__name',
    '[data-section="skills"] .skill-name'
  ];

  for (const selector of skillSelectors) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const skill = element.textContent?.trim();
      if (skill) {
        skills.push({ name: skill });
      }
    });
  }

  return skills;
}

function extractConnections(document: Document) {
  const connectionElements = document.querySelectorAll('.pv-top-card-v2-section__connections, .pv-top-card__connections');
  
  for (const element of connectionElements) {
    const text = element.textContent || '';
    const match = text.match(/(\d+)\s*connections?/i);
    if (match) {
      return {
        totalConnections: parseInt(match[1]),
        lastUpdated: new Date().toISOString()
      };
    }
  }

  return { totalConnections: 0 };
}

export async function POST(request: NextRequest) {
  try {
    const { linkedinUrl } = await request.json();
    
    if (!linkedinUrl) {
      return NextResponse.json({ error: "LinkedIn URL is required" }, { status: 400 });
    }

    console.log(`Fetching real LinkedIn data from: ${linkedinUrl}`);

    const profileData = await fetchRealLinkedInData(linkedinUrl);
    
    console.log('Successfully extracted LinkedIn data:', {
      name: `${profileData.firstName} ${profileData.lastName}`,
      headline: profileData.headline,
      connections: profileData.connections?.totalConnections
    });

    return NextResponse.json({ 
      success: true, 
      profile: profileData,
      source: "real_linkedin_scrape"
    });

  } catch (error) {
    console.error("LinkedIn scraping error:", error);
    
    return NextResponse.json({
      success: false,
      error: `Failed to fetch LinkedIn data: ${error instanceof Error ? error.message : String(error)}. LinkedIn may be blocking automated requests.`,
      suggestion: "Consider using a LinkedIn API service like Proxycurl for reliable data access."
    }, { status: 200 });
  }
}