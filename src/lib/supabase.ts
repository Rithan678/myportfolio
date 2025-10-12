import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ProfileData {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  headline: string;
  summary?: string;
  location?: string;
  profile_image?: string;
  connections: number;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceData {
  id: string;
  profile_id: string;
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  description?: string;
  current: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface CertificateData {
  id: string;
  profile_id: string;
  name: string;
  issuer: string;
  issue_date: string;
  expiration_date?: string;
  credential_id?: string;
  credential_url?: string;
  description?: string;
  skills?: string[];
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectData {
  id: string;
  profile_id: string;
  title: string;
  description?: string;
  url?: string;
  start_date?: string;
  end_date?: string;
  technologies?: string[];
  status: 'completed' | 'ongoing' | 'planned';
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface SkillData {
  id: string;
  profile_id: string;
  name: string;
  category: string;
  proficiency: number;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface CompleteProfileData {
  profile: ProfileData;
  experience: ExperienceData[];
  certificates: CertificateData[];
  projects: ProjectData[];
  skills: SkillData[];
}

// Database helper functions
export class PortfolioDB {
  private static readonly DEFAULT_USER_ID = 'default_user';

  // Profile operations
  static async getProfile(userId: string = this.DEFAULT_USER_ID): Promise<ProfileData | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  }

  static async upsertProfile(profileData: Partial<ProfileData>): Promise<ProfileData | null> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        ...profileData,
        user_id: profileData.user_id || this.DEFAULT_USER_ID,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting profile:', error);
      return null;
    }

    return data;
  }

  // Experience operations
  static async getExperience(profileId: string): Promise<ExperienceData[]> {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .eq('profile_id', profileId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching experience:', error);
      return [];
    }

    return data || [];
  }

  static async upsertExperience(expData: Partial<ExperienceData>): Promise<ExperienceData | null> {
    const { data, error } = await supabase
      .from('experience')
      .upsert({
        ...expData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting experience:', error);
      return null;
    }

    return data;
  }

  static async deleteExperience(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting experience:', error);
      return false;
    }

    return true;
  }

  // Certificates operations
  static async getCertificates(profileId: string): Promise<CertificateData[]> {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('profile_id', profileId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching certificates:', error);
      return [];
    }

    return data || [];
  }

  static async upsertCertificate(certData: Partial<CertificateData>): Promise<CertificateData | null> {
    const { data, error } = await supabase
      .from('certificates')
      .upsert({
        ...certData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting certificate:', error);
      return null;
    }

    return data;
  }

  static async deleteCertificate(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting certificate:', error);
      return false;
    }

    return true;
  }

  // Projects operations
  static async getProjects(profileId: string): Promise<ProjectData[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('profile_id', profileId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  }

  static async upsertProject(projectData: Partial<ProjectData>): Promise<ProjectData | null> {
    const { data, error } = await supabase
      .from('projects')
      .upsert({
        ...projectData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting project:', error);
      return null;
    }

    return data;
  }

  static async deleteProject(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }

    return true;
  }

  // Skills operations
  static async getSkills(profileId: string): Promise<SkillData[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('profile_id', profileId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }

    return data || [];
  }

  static async upsertSkills(profileId: string, skillNames: string[]): Promise<boolean> {
    try {
      // Delete existing skills
      await supabase
        .from('skills')
        .delete()
        .eq('profile_id', profileId);

      // Insert new skills
      const skillsData = skillNames.map((name, index) => ({
        profile_id: profileId,
        name: name.trim(),
        category: 'technical',
        proficiency: 3,
        order_index: index + 1
      }));

      const { error } = await supabase
        .from('skills')
        .insert(skillsData);

      if (error) {
        console.error('Error upserting skills:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in upsertSkills:', error);
      return false;
    }
  }

  // Get complete profile data
  static async getCompleteProfile(userId: string = this.DEFAULT_USER_ID): Promise<CompleteProfileData | null> {
    try {
      const profile = await this.getProfile(userId);
      if (!profile) return null;

      const [experience, certificates, projects, skills] = await Promise.all([
        this.getExperience(profile.id),
        this.getCertificates(profile.id),
        this.getProjects(profile.id),
        this.getSkills(profile.id)
      ]);

      return {
        profile,
        experience,
        certificates,
        projects,
        skills
      };
    } catch (error) {
      console.error('Error getting complete profile:', error);
      return null;
    }
  }
}