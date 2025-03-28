
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { MapPin, Phone, Mail, Briefcase, Globe, Award, Linkedin, Book, GraduationCap } from 'lucide-react';

const ExecutiveTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, education, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg font-serif">
      {/* Sophisticated header with premium styling */}
      <header className="bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Gold accent pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full" 
               style={{backgroundImage: `radial-gradient(circle, rgba(212,175,55,0.3) 2px, transparent 2px)`, backgroundSize: '20px 20px'}}></div>
        </div>
      
        <div className="flex flex-col md:flex-row px-8 py-12 relative z-10">
          {/* Left side with photo */}
          <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:border-r border-gray-700 relative overflow-hidden">
            {/* Premium photo area */}
            <div className="relative z-10 mb-6">
              {personalInfo.photoUrl ? (
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 blur-md opacity-50 scale-110"></div>
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800 shadow-xl relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-1">
                    <img 
                      src={personalInfo.photoUrl} 
                      alt={personalInfo.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800 shadow-xl relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-5xl text-gray-600">{personalInfo.name.charAt(0)}</span>
                </div>
              )}
            </div>
            
            {/* Name and title - elegantly centered on mobile, left-aligned on desktop */}
            <div className="text-center md:text-center">
              <h2 className="text-2xl font-light text-yellow-400 mb-1 uppercase tracking-wide">{personalInfo.title}</h2>
            </div>
              
            {/* Contact details with gold accents */}
            <div className="mt-6 flex flex-col space-y-3 text-center md:text-left text-gray-300 max-w-xs">
              {personalInfo.phone && (
                <div className="flex items-center justify-center md:justify-start">
                  <Phone size={16} className="mr-3 text-yellow-400" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.email && (
                <div className="flex items-center justify-center md:justify-start">
                  <Mail size={16} className="mr-3 text-yellow-400" />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin size={16} className="mr-3 text-yellow-400" />
                  <span className="text-sm">{personalInfo.address}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center justify-center md:justify-start">
                  <Linkedin size={16} className="mr-3 text-yellow-400" />
                  <span className="text-sm">{personalInfo.linkedin}</span>
                </div>
              )}

              {personalInfo.website && (
                <div className="flex items-center justify-center md:justify-start">
                  <Globe size={16} className="mr-3 text-yellow-400" />
                  <span className="text-sm">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Right side with name and summary */}
          <div className="w-full md:w-2/3 px-0 md:px-10 pt-10 md:pt-0 flex flex-col justify-center relative">
            {/* Executive name with premium styling */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center md:text-left mb-2">
              {personalInfo.name}
            </h1>
            
            {/* Gold separator line */}
            <div className="mx-auto md:ml-0 md:mr-auto w-24 h-1 mt-3 mb-6 bg-gradient-to-r from-yellow-300 to-yellow-600"></div>
            
            {summary && (
              <div className="mt-2 relative">
                <p className="text-gray-300 leading-relaxed">{summary}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Premium border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600"></div>
      </header>
      
      {/* Main content area */}
      <main className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left column - Skills and Education */}
        <div className="md:col-span-1 space-y-10">
          {/* Skills with executive presentation */}
          {skills.length > 0 && (
            <section>
              <h3 className="flex items-center text-lg font-semibold text-gray-900 border-b-2 border-yellow-400 inline-block pb-1 mb-6">
                <Award size={18} className="mr-2 text-yellow-600" />
                Core Competencies
              </h3>
              
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center py-1.5 group">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 font-medium group-hover:text-yellow-700 transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education with elegant styling */}
          {education.length > 0 && (
            <section>
              <h3 className="flex items-center text-lg font-semibold text-gray-900 border-b-2 border-yellow-400 inline-block pb-1 mb-6">
                <GraduationCap size={18} className="mr-2 text-yellow-600" />
                Education
              </h3>
              
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-gray-200 pl-5 py-2 hover:border-yellow-400 transition-colors group">
                    <h4 className="font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors">{edu.degree}</h4>
                    {edu.fieldOfStudy && (
                      <p className="text-gray-700">{edu.fieldOfStudy}</p>
                    )}
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500 text-sm mt-1">{edu.startDate} - {edu.endDate}</p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right column - Experience */}
        <div className="md:col-span-2 space-y-8">
          <h3 className="flex items-center text-lg font-semibold text-gray-900 border-b-2 border-yellow-400 inline-block pb-1 mb-8">
            <Briefcase size={18} className="mr-2 text-yellow-600" />
            Executive Experience
          </h3>
          
          {workExperience.length > 0 && (
            <div className="space-y-10">
              {workExperience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-gray-700 font-medium">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <div className="mt-2 md:mt-0 inline-flex items-center justify-center px-4 py-1.5 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md font-medium">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  
                  <div className="mt-4 pl-0 md:pl-6 border-l-0 md:border-l-2 md:border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -left-3 top-0 w-1.5 h-8 hidden md:block bg-yellow-500"></div>
                </div>
              ))}
            </div>
          )}
          
          {/* Executive quote or branding footer */}
          <div className="mt-10 pt-6 border-t border-gray-200 text-center">
            <div className="inline-block px-6 py-2 bg-gray-50 text-gray-600 text-sm italic rounded-md">
              "Excellence is not a skill. It's an attitude."
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveTemplate;
