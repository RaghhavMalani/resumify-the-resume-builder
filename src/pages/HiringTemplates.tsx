
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowRight } from 'lucide-react';

const HiringTemplates = () => {
  const templates = [
    {
      id: 'tech-startup',
      name: 'Tech Startup',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      description: 'Designed for software engineers and developers seeking positions at innovative startups.',
      industry: 'Technology',
    },
    {
      id: 'corporate-finance',
      name: 'Corporate Finance',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      description: 'Perfect for finance professionals applying to established corporate institutions.',
      industry: 'Finance',
    },
    {
      id: 'healthcare-professional',
      name: 'Healthcare Professional',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      description: 'Tailored for medical professionals, nurses, and healthcare administrators.',
      industry: 'Healthcare',
    },
    {
      id: 'marketing-creative',
      name: 'Marketing Creative',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'Designed for marketing specialists, graphic designers, and creative professionals.',
      industry: 'Marketing & Creative',
    },
    {
      id: 'education-academic',
      name: 'Education & Academic',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      description: 'Ideal for teachers, professors, and educational administrators.',
      industry: 'Education',
    },
    {
      id: 'engineering-professional',
      name: 'Engineering Professional',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      description: 'Structured for civil, mechanical, and other engineering disciplines.',
      industry: 'Engineering',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-resumify-background">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-resumify-beige mb-4">Company Hiring Templates</h1>
        <p className="text-xl text-resumify-off-white max-w-3xl mb-12">
          Professionally designed templates optimized for specific industries and hiring processes. Stand out with a resume tailored to your target company.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-gray-900 bg-opacity-60 rounded-lg overflow-hidden transition-transform hover:scale-105 border border-resumify-brown/30">
              <div className="h-56 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-resumify-white">{template.name}</h3>
                  <span className="px-2 py-1 bg-resumify-brown/70 text-white text-xs rounded-full">
                    {template.industry}
                  </span>
                </div>
                <p className="text-resumify-off-white mb-6">{template.description}</p>
                <Link
                  to={`/editor/${template.id}`}
                  className="inline-flex items-center gap-2 text-resumify-beige bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Use this template <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Decorative triangles */}
      <div className="triangle triangle-1"></div>
      <div className="triangle triangle-2"></div>
    </div>
  );
};

export default HiringTemplates;
