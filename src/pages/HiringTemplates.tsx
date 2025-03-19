
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HiringTemplates = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const templates = [
    {
      id: 'tech-startup',
      name: 'Tech Startup',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80',
      description: 'Designed for software engineers and developers seeking positions at innovative startups.',
      industry: 'Technology',
    },
    {
      id: 'corporate-finance',
      name: 'Corporate Finance',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80',
      description: 'Perfect for finance professionals applying to established corporate institutions.',
      industry: 'Finance',
    },
    {
      id: 'healthcare-professional',
      name: 'Healthcare Professional',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=500&q=80',
      description: 'Tailored for medical professionals, nurses, and healthcare administrators.',
      industry: 'Healthcare',
    },
    {
      id: 'marketing-creative',
      name: 'Marketing Creative',
      image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=500&q=80',
      description: 'Designed for marketing specialists, graphic designers, and creative professionals.',
      industry: 'Marketing & Creative',
    },
    {
      id: 'education-academic',
      name: 'Education & Academic',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80',
      description: 'Ideal for teachers, professors, and educational administrators.',
      industry: 'Education',
    },
    {
      id: 'engineering-professional',
      name: 'Engineering Professional',
      image: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?auto=format&fit=crop&w=500&q=80',
      description: 'Structured for civil, mechanical, and other engineering disciplines.',
      industry: 'Engineering',
    },
    {
      id: 'legal-services',
      name: 'Legal Services',
      image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=500&q=80',
      description: 'Professional template for attorneys, paralegals, and legal consultants.',
      industry: 'Legal',
    },
    {
      id: 'data-science',
      name: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
      description: 'Optimized for data scientists, analysts, and machine learning experts.',
      industry: 'Data & Analytics',
    },
    {
      id: 'hospitality',
      name: 'Hospitality & Tourism',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
      description: 'Designed for hotel management, tourism, and customer service professionals.',
      industry: 'Hospitality',
    },
  ];

  useEffect(() => {
    // Preload all images
    const imagePromises = templates.map(template => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = template.image;
        img.onload = () => {
          setLoadingCount(prev => prev + 1);
          resolve(null);
        };
        img.onerror = () => resolve(null);
      });
    });

    // When all images are loaded
    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  // Calculate loading progress
  const loadingProgress = Math.round((loadingCount / templates.length) * 100);

  return (
    <div className="min-h-screen w-full bg-resumify-background">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-resumify-beige mb-4">Professional Resume Templates</h1>
          <p className="text-xl text-resumify-off-white max-w-3xl mb-12">
            Industry-optimized templates designed to match hiring standards for specific careers and companies. Stand out with a resume tailored to your target role.
          </p>
        </motion.div>

        {!imagesLoaded && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={40} className="text-resumify-beige animate-spin mb-4" />
            <p className="text-resumify-off-white text-lg">Loading templates ({loadingProgress}%)</p>
          </div>
        )}
        
        {imagesLoaded && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {templates.map((template, index) => (
              <motion.div 
                key={template.id} 
                className="bg-gray-900 bg-opacity-80 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-resumify-brown/20 border border-resumify-brown/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-resumify-white">{template.name}</h3>
                    <span className="px-2 py-1 bg-resumify-brown/80 text-white text-xs rounded-full">
                      {template.industry}
                    </span>
                  </div>
                  <p className="text-resumify-off-white mb-6">{template.description}</p>
                  <Link
                    to={`/editor/${template.id}`}
                    className="inline-flex items-center gap-2 text-resumify-beige bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors border border-resumify-brown/30"
                  >
                    Use this template <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
      
      {/* User feedback and suggestions section */}
      <section className="container mx-auto py-12 px-4 mb-12">
        <div className="bg-gray-900 bg-opacity-80 border border-resumify-brown/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-resumify-beige mb-4">Need More Help With Your Resume?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-resumify-brown/20">
              <h3 className="text-xl font-semibold text-resumify-beige mb-3">AI Writing Assistant</h3>
              <p className="text-resumify-off-white mb-4">
                Perfect your resume with AI-powered suggestions. Our AI assistant can help you craft compelling bullet points and improve your wording.
              </p>
              <Link
                to="/editor/tech-startup"
                className="inline-flex items-center gap-2 text-resumify-beige bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Try AI Assistant <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-resumify-brown/20">
              <h3 className="text-xl font-semibold text-resumify-beige mb-3">Grammar Check</h3>
              <p className="text-resumify-off-white mb-4">
                Ensure your resume is error-free. Our integrated grammar checker helps you identify and fix spelling and grammar mistakes.
              </p>
              <a
                href="https://www.grammarly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-resumify-beige bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Check with Grammarly <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Decorative triangles */}
      <div className="triangle triangle-1"></div>
      <div className="triangle triangle-2"></div>
    </div>
  );
};

export default HiringTemplates;
