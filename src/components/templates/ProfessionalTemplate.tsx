
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const ProfessionalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg p-8 font-sans">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
        <h2 className="text-xl text-gray-600">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap mt-3 gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail size={14} className="mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin size={14} className="mr-1" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-2">Summary</h3>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}
      
      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-2">Work Experience</h3>
          
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className="text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <p className="text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-2">Education</h3>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <p className="text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-2">Skills</h3>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id}
                className="bg-gray-200 px-3 py-1 rounded-md text-gray-800"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
