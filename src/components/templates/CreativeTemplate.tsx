
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe, Star } from 'lucide-react';

const CreativeTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg font-sans overflow-hidden">
      {/* Visually creative header with asymmetric design */}
      <header className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-8 left-1/3 w-12 h-12 bg-yellow-400 opacity-30 rounded-full"></div>
        
        <div className="flex items-start gap-8 relative z-10">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{personalInfo.name}</h1>
            <h2 className="text-xl mt-1 text-purple-100">{personalInfo.title}</h2>
            
            <div className="mt-6 max-w-lg">
              {summary && (
                <p className="italic text-purple-100">{summary}</p>
              )}
            </div>
            
            <div className="flex flex-wrap mt-6 gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors">
                  <Mail size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors">
                  <Phone size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors">
                  <MapPin size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors">
                  <Linkedin size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}

              {personalInfo.website && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors">
                  <Globe size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Profile photo with creative styling */}
          {personalInfo.photoUrl && (
            <div className="h-36 w-36 rounded-xl overflow-hidden transform rotate-3 border-4 border-white/30 shadow-xl">
              <img 
                src={personalInfo.photoUrl} 
                alt={`${personalInfo.name}`} 
                className="h-full w-full object-cover"
              />
              {/* Decorative corner accent */}
              <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-yellow-400 z-[-1] rounded-tl-xl"></div>
            </div>
          )}
        </div>
      </header>
      
      {/* Creative layout with asymmetric columns */}
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 relative">
          {/* Visual accent */}
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-100 to-transparent"></div>
          
          {/* Skills with creative visualization */}
          {skills.length > 0 && (
            <section className="mb-8 relative z-10">
              <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
                <Star size={16} className="mr-2 text-yellow-500" fill="currentColor" />
                SKILLS
              </h3>
              
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        style={{ width: `${(skill.level || 3) * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section className="relative z-10">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">EDUCATION</h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="group p-3 rounded-lg transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                        {edu.fieldOfStudy && <p className="text-purple-600">{edu.fieldOfStudy}</p>}
                        <p className="text-gray-600 text-sm">{edu.institution}</p>
                      </div>
                      <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right main content */}
        <div className="w-full md:w-2/3 p-6">
          {/* Work Experience with timeline design */}
          {workExperience.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-purple-700 mb-6 pb-2 border-b border-gray-200">
                EXPERIENCE
              </h3>
              
              <div className="space-y-8 relative">
                {/* Timeline line */}
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-purple-100"></div>
                
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-8">
                    {/* Timeline dot */}
                    <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-purple-600 border-4 border-purple-100"></div>
                    
                    <div className="mb-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{exp.position}</h4>
                          <p className="text-purple-600">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                        </div>
                        <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm self-start mt-2 md:mt-0">
                          {exp.startDate} - {exp.endDate}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-3">{exp.description}</p>
                    </div>
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
