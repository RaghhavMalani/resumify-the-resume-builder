
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const MinimalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg p-8 font-sans relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-white opacity-50 z-0"></div>
      
      <div className="relative z-10">
        {/* Header with refined minimal style */}
        <header className="mb-12 relative">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-1">{personalInfo.name}</h1>
              <h2 className="text-lg text-gray-500 font-light tracking-wider uppercase mb-4">{personalInfo.title}</h2>
              
              {summary && (
                <p className="text-gray-600 max-w-xl leading-relaxed">{summary}</p>
              )}
            </div>
            
            {personalInfo.photoUrl && (
              <div className="h-28 w-28 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <img 
                  src={personalInfo.photoUrl} 
                  alt={`${personalInfo.name}`} 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start mt-6 gap-5 text-xs text-gray-500">
            {personalInfo.email && (
              <div className="flex items-center hover:text-gray-700 transition-colors group">
                <Mail size={14} className="mr-2 group-hover:text-blue-500 transition-colors" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center hover:text-gray-700 transition-colors group">
                <Phone size={14} className="mr-2 group-hover:text-blue-500 transition-colors" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-center hover:text-gray-700 transition-colors group">
                <MapPin size={14} className="mr-2 group-hover:text-blue-500 transition-colors" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center hover:text-gray-700 transition-colors group">
                <Linkedin size={14} className="mr-2 group-hover:text-blue-500 transition-colors" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}

            {personalInfo.website && (
              <div className="flex items-center hover:text-gray-700 transition-colors group">
                <Globe size={14} className="mr-2 group-hover:text-blue-500 transition-colors" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
          
          {/* Refined divider */}
          <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </header>
        
        {/* Main content in an elegant grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="md:col-span-7">
            {workExperience.length > 0 && (
              <section className="mb-10">
                <h3 className="text-sm tracking-widest uppercase font-semibold text-gray-400 mb-5 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-gray-200 after:mt-1">Experience</h3>
                
                <div className="space-y-8">
                  {workExperience.map((exp) => (
                    <div key={exp.id} className="group">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{exp.position}</h4>
                          <p className="text-gray-600 text-sm">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                        </div>
                        <p className="text-gray-400 text-xs px-2 py-1 rounded-full border border-gray-100 bg-gray-50">{exp.startDate} — {exp.endDate}</p>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-5">
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-8">
                <h3 className="text-sm tracking-widest uppercase font-semibold text-gray-400 mb-5 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-gray-200 after:mt-1">Education</h3>
                
                <div className="space-y-5">
                  {education.map((edu) => (
                    <div key={edu.id} className="group">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h4>
                          <p className="text-gray-600 text-sm">{edu.institution}</p>
                        </div>
                        <p className="text-gray-400 text-xs px-2 py-1 rounded-full border border-gray-100 bg-gray-50">{edu.startDate} — {edu.endDate}</p>
                      </div>
                      {edu.description && <p className="text-gray-600 text-sm leading-relaxed">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h3 className="text-sm tracking-widest uppercase font-semibold text-gray-400 mb-5 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-gray-200 after:mt-1">Skills</h3>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill.id}
                      className="text-xs px-3 py-1.5 rounded-full text-gray-600 bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
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
    </div>
  );
};

export default MinimalTemplate;
