
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowRight } from 'lucide-react';

const Templates = () => {
  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      image: 'public/lovable-uploads/5d3aa923-9f92-4888-92c8-e4569d43a69f.png',
      description: 'A clean, professional template suitable for most industries.',
    },
    {
      id: 'creative',
      name: 'Creative',
      image: 'public/lovable-uploads/31edf4ea-9433-4832-8c24-dd526f74eb4c.png',
      description: 'Stand out with this modern, creative design.',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      image: 'public/lovable-uploads/c6552aa9-8ed4-4cac-8580-8d009d8eab1c.png',
      description: 'A simple, elegant template that focuses on your content.',
    },
    {
      id: 'executive',
      name: 'Executive',
      image: 'public/lovable-uploads/5d3aa923-9f92-4888-92c8-e4569d43a69f.png',
      description: 'Sophisticated design for senior professionals and executives.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-resumify-background">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-resumify-beige mb-4">Choose Your Template</h1>
        <p className="text-xl text-resumify-off-white max-w-3xl mb-12">
          Select a professionally designed template to get started. You can customize it with your information.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-white bg-opacity-5 rounded-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-56 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-resumify-white mb-2">{template.name}</h3>
                <p className="text-resumify-off-white mb-6">{template.description}</p>
                <Link
                  to={`/editor/${template.id}`}
                  className="inline-flex items-center gap-2 text-resumify-beige hover:text-resumify-brown-dark font-medium"
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

export default Templates;
