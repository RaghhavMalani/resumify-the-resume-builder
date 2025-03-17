
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const CreativeTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg font-sans overflow-hidden">
      {/* Header - with accent color */}
      <header className="bg-resumify-brown text-white p-8">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <h2 className="text-xl mt-1 opacity-90">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap mt-4 gap-6 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin size={16} className="mr-2" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left column - Skills and Education */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-resumify-brown mb-3">SKILLS</h3>
              
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-resumify-brown rounded-full"></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-resumify-brown mb-3">EDUCATION</h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    {edu.fieldOfStudy && <p className="text-gray-700">{edu.fieldOfStudy}</p>}
                    <p className="text-gray-600">{edu.institution}</p>
                    {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right column - Summary and Experience */}
        <div className="w-full md:w-2/3 p-6">
          {/* Summary */}
          {summary && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-resumify-brown mb-3">PROFILE</h3>
              <p className="text-gray-700">{summary}</p>
            </section>
          )}
          
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-resumify-brown mb-3">EXPERIENCE</h3>
              
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                      <div>
                        <h4 className="font-semibold">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                      </div>
                      <p className="text-gray-500 sm:text-right">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-1">{exp.description}</p>
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

export default CreativeTemplate;
