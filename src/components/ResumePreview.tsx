
import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import { Download, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

const ResumePreview: React.FC = () => {
  const { templateId } = useResume();
  const [scale, setScale] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [templateId]);

  // Reset loading state when template changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [templateId]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div className="relative flex flex-col bg-white shadow-lg rounded-lg w-full overflow-hidden">
      {/* Controls */}
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b">
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleZoomIn}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn size={18} />
          </button>
          <button 
            onClick={handleZoomOut}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleRotate}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Refresh template"
          >
            <RefreshCw size={18} className={isRotating ? 'animate-spin' : ''} />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Download resume"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
      
      {/* Template display area with loading skeleton */}
      <div className="relative flex-1 overflow-auto p-4 bg-gray-50 flex justify-center">
        {isLoading ? (
          <div className="w-full max-w-3xl h-[800px] bg-gray-200 animate-pulse rounded">
            <div className="h-20 bg-gray-300 mb-4"></div>
            <div className="h-10 bg-gray-300 mb-6 w-1/2 mx-auto"></div>
            <div className="h-40 bg-gray-300 mb-4"></div>
            <div className="h-60 bg-gray-300"></div>
          </div>
        ) : (
          <div 
            className={`transition-all transform duration-300 ${isRotating ? 'animate-scale-in' : ''}`}
            style={{ transform: `scale(${scale})` }}
          >
            <div className="w-full max-w-3xl h-[800px] overflow-hidden transition-shadow duration-300 hover:shadow-xl">
              {templateId === 'professional' && <ProfessionalTemplate />}
              {templateId === 'creative' && <CreativeTemplate />}
              {templateId === 'minimal' && <MinimalTemplate />}
              {templateId === 'executive' && <ExecutiveTemplate />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
