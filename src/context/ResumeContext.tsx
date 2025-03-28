import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define resume data types
interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  website?: string;
  photoUrl?: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level?: number; // 1-5
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
}

// Create default resume data
const defaultResumeData: ResumeData = {
  personalInfo: {
    name: 'Aman Rajiv',
    title: 'Engineer',
    email: 'aman.rajiv@gmail.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY',
    linkedin: 'linkedin.com/in/amanrajiv',
    website: 'amanrajiv.com',
    photoUrl: 'public/lovable-uploads/862e82e3-5566-457a-94f0-5679526725a5.png',
  },
  summary: 'Experienced software engineer with a passion for building innovative solutions.',
  education: [
    {
      id: '1',
      institution: 'MIT',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2014',
      endDate: '2018',
      description: 'Graduated with honors. Focused on AI and machine learning.',
    },
  ],
  workExperience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2018',
      endDate: 'Present',
      description: 'Lead developer for cloud-based enterprise solutions. Implemented CI/CD pipelines and microservices architecture.',
    },
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 5 },
    { id: '2', name: 'React', level: 4 },
    { id: '3', name: 'Node.js', level: 4 },
    { id: '4', name: 'Python', level: 3 },
  ],
};

// Create context type
interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  templateId: string;
  setTemplateId: React.Dispatch<React.SetStateAction<string>>;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addWorkExperience: (experience: Omit<WorkExperience, 'id'>) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
}

// Create the context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Create a provider component
export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [templateId, setTemplateId] = useState<string>('professional');

  // Helper functions to update resume data
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const addEducation = (education: Omit<Education, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { ...education, id }]
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === id ? { ...item, ...education } : item
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const addWorkExperience = (experience: Omit<WorkExperience, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { ...experience, id }]
    }));
  };

  const updateWorkExperience = (id: string, experience: Partial<WorkExperience>) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(item => 
        item.id === id ? { ...item, ...experience } : item
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(item => item.id !== id)
    }));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id }]
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(item => 
        item.id === id ? { ...item, ...skill } : item
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      templateId,
      setTemplateId,
      updatePersonalInfo,
      updateSummary,
      addEducation,
      updateEducation,
      removeEducation,
      addWorkExperience,
      updateWorkExperience,
      removeWorkExperience,
      addSkill,
      updateSkill,
      removeSkill
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Create a hook to use the context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
