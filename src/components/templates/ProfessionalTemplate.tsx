
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award } from 'lucide-react';

const ProfessionalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg font-sans">
      {/* Modern header with subtle gradient background */}
      <header className="relative bg-gradient-to-r from-blue-50 to-gray-50 p-8 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
            <h2 className="text-xl text-blue-600">{personalInfo.title}</h2>
            
            {summary && (
              <p className="text-gray-600 max-w-xl mt-2 leading-relaxed">{summary}</p>
            )}
            
            <div className="flex flex-wrap mt-5 gap-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 group hover:border-blue-200 transition-all">
                  <Mail size={14} className="mr-2 text-blue-500" />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 group hover:border-blue-200 transition-all">
                  <Phone size={14} className="mr-2 text-blue-500" />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 group hover:border-blue-200 transition-all">
                  <MapPin size={14} className="mr-2 text-blue-500" />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{personalInfo.address}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 group hover:border-blue-200 transition-all">
                  <Linkedin size={14} className="mr-2 text-blue-500" />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{personalInfo.linkedin}</span>
                </div>
              )}

              {personalInfo.website && (
                <div className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 group hover:border-blue-200 transition-all">
                  <Globe size={14} className="mr-2 text-blue-500" />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Profile photo with refined styling */}
          {personalInfo.photoUrl && (
            <div className="h-36 w-36 rounded-xl overflow-hidden border-4 border-white shadow-md">
              <img 
                src={personalInfo.photoUrl} 
                alt={`${personalInfo.name}`} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        
        {/* Modern decorative element */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>
      </header>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left sidebar */}
        <div className="col-span-1 bg-gray-50 p-8 border-r border-gray-200">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-10">
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-5">
                <Award size={18} className="mr-2 text-blue-500" />
                Skills
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{skill.name}</span>
                      {skill.level && (
                        <span className="text-xs text-gray-500">{skill.level}/5</span>
                      )}
                    </div>
                    {skill.level && (
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{ width: `${(skill.level) * 20}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-5">
                <GraduationCap size={18} className="mr-2 text-blue-500" />
                Education
              </h3>
              
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="group border-l-2 border-gray-200 pl-4 py-1 hover:border-blue-500 transition-colors">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{edu.degree}</h4>
                    {edu.fieldOfStudy && <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>}
                    <p className="text-gray-500 text-sm">{edu.institution}</p>
                    <p className="text-gray-400 text-xs mt-1">{edu.startDate} - {edu.endDate}</p>
                    {edu.description && <p className="text-gray-600 text-sm mt-2 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Main content area */}
        <div className="col-span-2 p-8">
          {/* Professional Experience */}
          {workExperience.length > 0 && (
            <section>
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-6">
                <Briefcase size={18} className="mr-2 text-blue-500" />
                Professional Experience
              </h3>
              
              <div className="space-y-8">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <p className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full inline-block">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
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
