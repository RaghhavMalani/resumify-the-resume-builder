
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const MinimalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg p-10 font-sans">
      {/* Header - Minimalist style */}
      <header className="mb-8 text-center border-b border-gray-200 pb-6 relative">
        {personalInfo.photoUrl && (
          <div className="mx-auto h-20 w-20 rounded-full overflow-hidden border border-gray-200 mb-4">
            <img 
              src={personalInfo.photoUrl} 
              alt={`${personalInfo.name}`} 
              className="h-full w-full object-cover"
            />
          </div>
        )}
        
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">{personalInfo.name}</h1>
        <h2 className="text-lg text-gray-600 mt-1">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap justify-center mt-4 gap-3 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center backdrop-blur-sm bg-gray-50/30 shadow-sm px-2 py-1 rounded">
              <Mail size={12} className="mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center backdrop-blur-sm bg-gray-50/30 shadow-sm px-2 py-1 rounded">
              <Phone size={12} className="mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center backdrop-blur-sm bg-gray-50/30 shadow-sm px-2 py-1 rounded">
              <MapPin size={12} className="mr-1" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center backdrop-blur-sm bg-gray-50/30 shadow-sm px-2 py-1 rounded">
              <Linkedin size={12} className="mr-1" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}

          {personalInfo.website && (
            <div className="flex items-center backdrop-blur-sm bg-gray-50/30 shadow-sm px-2 py-1 rounded">
              <Globe size={12} className="mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-gray-700 text-center italic">{summary}</p>
        </section>
      )}
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        {/* Left Column - Work Experience */}
        <div>
          {workExperience.length > 0 && (
            <section className="mb-6">
              <h3 className="text-sm tracking-widest font-bold uppercase border-b border-gray-300 pb-1 mb-3">Experience</h3>
              
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="group">
                    <h4 className="font-semibold group-hover:text-gray-900 transition-colors">{exp.position}</h4>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>{exp.company}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    {exp.location && <p className="text-gray-600 text-sm italic">{exp.location}</p>}
                    <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right Column - Education and Skills */}
        <div>
          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-sm tracking-widest font-bold uppercase border-b border-gray-300 pb-1 mb-3">Education</h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="group">
                    <h4 className="font-semibold group-hover:text-gray-900 transition-colors">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h4>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>{edu.institution}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    {edu.description && <p className="text-gray-700 text-sm mt-2">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-sm tracking-widest font-bold uppercase border-b border-gray-300 pb-1 mb-3">Skills</h3>
              
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="text-sm border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors px-2 py-1 rounded"
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
