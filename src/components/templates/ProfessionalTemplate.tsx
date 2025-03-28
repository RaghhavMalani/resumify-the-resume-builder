
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ProfessionalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg font-sans">
      {/* Header with optional photo - Modern professional design */}
      <header className="relative bg-gray-50 p-8 border-b-2 border-gray-200">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
            <h2 className="text-xl text-gray-600">{personalInfo.title}</h2>
            
            <div className="flex flex-wrap mt-4 gap-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  <Mail size={14} className="mr-2 text-blue-600" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  <Phone size={14} className="mr-2 text-blue-600" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  <MapPin size={14} className="mr-2 text-blue-600" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  <Linkedin size={14} className="mr-2 text-blue-600" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}

              {personalInfo.website && (
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  <Globe size={14} className="mr-2 text-blue-600" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Optional profile photo */}
          {personalInfo.photoUrl && (
            <div className="h-32 w-32 rounded-lg overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={personalInfo.photoUrl} 
                alt={`${personalInfo.name}`} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        
        {/* Modern decorative element */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-blue-600"></div>
      </header>
      
      {/* Two-column layout for main content */}
      <div className="grid grid-cols-3 gap-6 p-8">
        {/* Left column (1/3 width) */}
        <div className="col-span-1 space-y-6">
          {/* Summary */}
          {summary && (
            <section>
              <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-200 pb-1 mb-3">Summary</h3>
              <p className="text-gray-700">{summary}</p>
            </section>
          )}
          
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-200 pb-1 mb-3">Skills</h3>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="bg-gray-100 px-3 py-1 rounded-md text-gray-800 text-sm border border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right column (2/3 width) */}
        <div className="col-span-2 space-y-6">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-200 pb-1 mb-3">Professional Experience</h3>
              
              <div className="space-y-5">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-200 pb-1 mb-3">Education</h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
