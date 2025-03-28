
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe, Star, LightbulbIcon, Hash } from 'lucide-react';

const CreativeTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg font-sans overflow-hidden">
      {/* Modern creative header with vibrant gradient */}
      <header className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-10 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-300 opacity-20 rounded-full blur-md"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="flex items-start gap-8 relative z-10">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl mt-1 font-light text-purple-100">{personalInfo.title}</h2>
            
            <div className="mt-6 max-w-lg">
              {summary && (
                <p className="text-purple-50 leading-relaxed">{summary}</p>
              )}
            </div>
            
            <div className="flex flex-wrap mt-6 gap-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-center backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/20 transition-colors">
                  <Mail size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/20 transition-colors">
                  <Phone size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/20 transition-colors">
                  <MapPin size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/20 transition-colors">
                  <Linkedin size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}

              {personalInfo.website && (
                <div className="flex items-center backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/20 transition-colors">
                  <Globe size={15} className="mr-2 text-purple-200" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Profile photo with creative styling */}
          {personalInfo.photoUrl && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl blur-md opacity-80 scale-105"></div>
              <div className="h-40 w-40 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl relative z-10">
                <img 
                  src={personalInfo.photoUrl} 
                  alt={`${personalInfo.name}`} 
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-yellow-400 z-0 rounded-md rotate-12"></div>
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 z-0 rounded-full opacity-80"></div>
            </div>
          )}
        </div>
      </header>
      
      {/* Creative layout with modern design */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left sidebar */}
        <div className="md:col-span-4 bg-gray-50 p-8 border-r border-gray-100">
          {/* Skills with creative visualization */}
          {skills.length > 0 && (
            <section className="mb-10">
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-6">
                <Star size={18} className="mr-2 text-purple-500" fill="currentColor" />
                Skills
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-700 hover:border-purple-200 hover:shadow-md transition-all text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-6">
                <LightbulbIcon size={18} className="mr-2 text-yellow-500" />
                Education
              </h3>
              
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="group p-4 rounded-lg hover:bg-white hover:shadow-md transition-all">
                    <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">{edu.degree}</h4>
                    {edu.fieldOfStudy && <p className="text-purple-600">{edu.fieldOfStudy}</p>}
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                    <div className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-3">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right main content */}
        <div className="md:col-span-8 p-8">
          {/* Work Experience with creative timeline */}
          {workExperience.length > 0 && (
            <section>
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-8">
                <Hash size={18} className="mr-2 text-indigo-500" />
                Experience
              </h3>
              
              <div className="space-y-12 relative">
                {/* Timeline line */}
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100"></div>
                
                {workExperience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-8">
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-[-8px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-md z-10"
                      style={{
                        background: `linear-gradient(to right, #6366f1, #8b5cf6)`,
                      }}
                    ></div>
                    
                    <div className="mb-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h4 className="font-semibold text-xl text-gray-900">{exp.position}</h4>
                          <p className="text-purple-600">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                        </div>
                        <div className="mt-2 md:mt-0 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                          {exp.startDate} - {exp.endDate}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4 leading-relaxed">{exp.description}</p>
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
