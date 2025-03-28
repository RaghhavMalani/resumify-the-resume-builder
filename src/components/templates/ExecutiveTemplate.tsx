
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { MapPin, Phone, Mail, Briefcase, Globe, Award, Linkedin } from 'lucide-react';

const ExecutiveTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, education, skills } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 shadow-lg font-serif">
      {/* Executive header with gold accents */}
      <header className="bg-gray-900 text-white relative">
        <div className="flex flex-col md:flex-row">
          {/* Left side with photo */}
          <div className="w-full md:w-1/3 p-8 flex flex-col justify-center items-center bg-gray-800 relative overflow-hidden">
            {/* Gold accent elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500 opacity-20 transform rotate-45 translate-x-8 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500 opacity-10 rounded-full -translate-x-10 translate-y-10"></div>
            
            {/* Photo area */}
            <div className="relative z-10">
              {personalInfo.photoUrl ? (
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl mx-auto">
                  <img 
                    src={personalInfo.photoUrl} 
                    alt={personalInfo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl mx-auto bg-gray-700 flex items-center justify-center">
                  <span className="text-5xl text-gray-500">{personalInfo.name.charAt(0)}</span>
                </div>
              )}
              
              {/* Contact details - vertical stack for mobile/left column */}
              <div className="mt-6 flex flex-col space-y-3 text-center md:text-left text-gray-300">
                {personalInfo.phone && (
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone size={14} className="mr-2 text-yellow-500" />
                    <span className="text-sm">{personalInfo.phone}</span>
                  </div>
                )}
                
                {personalInfo.email && (
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail size={14} className="mr-2 text-yellow-500" />
                    <span className="text-sm">{personalInfo.email}</span>
                  </div>
                )}
                
                {personalInfo.address && (
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin size={14} className="mr-2 text-yellow-500" />
                    <span className="text-sm">{personalInfo.address}</span>
                  </div>
                )}
                
                {personalInfo.linkedin && (
                  <div className="flex items-center justify-center md:justify-start">
                    <Linkedin size={14} className="mr-2 text-yellow-500" />
                    <span className="text-sm">{personalInfo.linkedin}</span>
                  </div>
                )}

                {personalInfo.website && (
                  <div className="flex items-center justify-center md:justify-start">
                    <Globe size={14} className="mr-2 text-yellow-500" />
                    <span className="text-sm">{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right side with name and summary */}
          <div className="w-full md:w-2/3 p-8 flex flex-col justify-center relative">
            {/* Gold corner accent */}
            <div className="absolute top-0 right-0 border-t-[40px] border-r-[40px] border-t-yellow-500 border-r-transparent opacity-80"></div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white mb-1">{personalInfo.name}</h1>
            <h2 className="text-2xl text-yellow-500 font-light mb-6">{personalInfo.title}</h2>
            
            {summary && (
              <div className="mt-2 relative">
                <div className="absolute top-0 left-0 w-16 h-1 bg-yellow-500"></div>
                <p className="pt-4 text-gray-300 leading-relaxed">{summary}</p>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content area */}
      <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Skills and Education */}
        <div className="md:col-span-1 space-y-8">
          {/* Skills with executive presentation */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-yellow-500 inline-block pb-1 mb-4">
                Core Competencies
              </h3>
              
              <div className="space-y-1">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center py-1.5">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education with elegant styling */}
          {education.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-yellow-500 inline-block pb-1 mb-4">
                Education
              </h3>
              
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-gray-200 pl-4 py-1 hover:border-yellow-500 transition-colors">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    {edu.fieldOfStudy && (
                      <p className="text-gray-700">{edu.fieldOfStudy}</p>
                    )}
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate}</p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right column - Experience */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-yellow-500 inline-block pb-1 mb-6">
            Executive Experience
          </h3>
          
          {workExperience.length > 0 && (
            <div className="space-y-8">
              {workExperience.map((exp) => (
                <div key={exp.id} className="relative pb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-gray-700 font-medium">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <p className="text-yellow-600 font-medium bg-yellow-50 border border-yellow-200 px-3 py-1 rounded md:ml-4 inline-block md:inline mt-2 md:mt-0">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <div className="mt-2 pl-0 md:pl-4 border-l-0 md:border-l-2 md:border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -left-2 top-0 w-1 h-8 hidden md:block bg-yellow-500"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExecutiveTemplate;
