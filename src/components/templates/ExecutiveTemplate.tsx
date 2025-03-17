
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react';

const ExecutiveTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, skills } = resumeData;

  return (
    <div className="w-full h-full bg-gray-200 text-gray-800 shadow-lg font-sans">
      {/* Header with profile picture */}
      <div className="flex bg-white border-b-2 border-gray-300">
        {/* Profile Picture */}
        <div className="w-1/3 p-5 flex justify-center items-center">
          <div className="rounded-full overflow-hidden w-40 h-40 border-4 border-resumify-brown">
            <img 
              src="public/lovable-uploads/862e82e3-5566-457a-94f0-5679526725a5.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Name and Title */}
        <div className="w-2/3 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900 animate-fade-in">{personalInfo.name}</h1>
          <h2 className="text-2xl text-resumify-brown mt-2 animate-fade-in delay-100">{personalInfo.title}</h2>
          
          {/* Contact Info */}
          <div className="flex flex-col mt-4 space-y-2 animate-fade-in delay-200">
            {personalInfo.address && (
              <div className="flex items-center text-gray-700">
                <MapPin size={16} className="mr-2 text-resumify-brown" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center text-gray-700">
                <Phone size={16} className="mr-2 text-resumify-brown" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.email && (
              <div className="flex items-center text-gray-700">
                <Mail size={16} className="mr-2 text-resumify-brown" />
                <span>{personalInfo.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 p-8 bg-gray-200">
        {/* Summary */}
        {summary && (
          <section className="bg-white p-6 rounded-md shadow-sm animate-slide-in-right">
            <p className="text-gray-700 italic">{summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="bg-white p-6 rounded-md shadow-sm animate-slide-in-right delay-100">
            <h3 className="text-xl font-bold text-resumify-brown border-b-2 border-gray-200 pb-2 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={skill.id}
                  className="bg-gray-100 px-3 py-1 rounded-full text-gray-800 hover:bg-resumify-brown hover:text-white transition-all duration-300 transform hover:scale-105 cursor-default"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="bg-white p-6 rounded-md shadow-sm animate-slide-in-right delay-200">
            <h3 className="text-xl font-bold text-resumify-brown border-b-2 border-gray-200 pb-2 mb-4">Work History</h3>
            
            <div className="space-y-4 relative">
              {/* Timeline line */}
              <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-300"></div>
              
              {workExperience.map((exp, index) => (
                <div key={exp.id} className="ml-10 relative animate-fade-in" style={{ animationDelay: `${300 + index * 200}ms` }}>
                  {/* Timeline dot */}
                  <div className="absolute -left-10 top-1.5 w-5 h-5 rounded-full bg-resumify-brown"></div>
                  
                  <div className="flex flex-col mb-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-lg">{exp.position}</h4>
                      <span className="text-resumify-brown font-medium">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
