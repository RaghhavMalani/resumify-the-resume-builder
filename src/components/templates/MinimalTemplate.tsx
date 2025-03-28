
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const MinimalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg p-10 font-sans">
      {/* Header - Ultra minimal style with monochromatic scheme */}
      <header className="mb-10 text-center relative">
        {personalInfo.photoUrl && (
          <div className="mx-auto h-24 w-24 rounded-full overflow-hidden border border-gray-100 mb-4 shadow-sm">
            <img 
              src={personalInfo.photoUrl} 
              alt={`${personalInfo.name}`} 
              className="h-full w-full object-cover"
            />
          </div>
        )}
        
        <h1 className="text-3xl font-light tracking-wide text-gray-900">{personalInfo.name}</h1>
        <h2 className="text-lg text-gray-500 mt-1 font-light tracking-wider uppercase">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap justify-center mt-6 gap-4 text-xs text-gray-500">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail size={12} className="mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone size={12} className="mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <MapPin size={12} className="mr-1" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin size={12} className="mr-1" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}

          {personalInfo.website && (
            <div className="flex items-center">
              <Globe size={12} className="mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
        
        {/* Minimal divider */}
        <div className="mx-auto mt-6 w-16 h-px bg-gray-300"></div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-10">
          <p className="text-gray-600 text-center max-w-2xl mx-auto">{summary}</p>
        </section>
      )}
      
      {/* Main Content in a clean grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {/* Left Column */}
        <div>
          {workExperience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-sm tracking-widest uppercase font-semibold text-gray-400 mb-4">Experience</h3>
              
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="group">
                    <h4 className="font-medium text-gray-900">{exp.position}</h4>
                    <p className="text-gray-500 text-sm">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    <p className="text-gray-400 text-xs mt-1">{exp.startDate} — {exp.endDate}</p>
                    <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right Column */}
        <div>
          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h3 className="text-sm tracking-widest uppercase font-semibold text-gray-400 mb-4">Education</h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="group">
                    <h4 className="font-medium text-gray-900">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h4>
                    <p className="text-gray-500 text-sm">{edu.institution}</p>
                    <p className="text-gray-400 text-xs mt-1">{edu.startDate} — {edu.endDate}</p>
                    {edu.description && <p className="text-gray-600 text-sm mt-2">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-sm tracking-widest uppercase font-semibold text-gray-400 mb-4">Skills</h3>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="text-xs text-gray-600 border border-gray-200 px-2 py-1 rounded-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
