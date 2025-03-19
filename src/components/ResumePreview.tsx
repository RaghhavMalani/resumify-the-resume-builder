
import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Share2, 
  RotateCw, 
  Printer, 
  Heart 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const ResumePreview: React.FC = () => {
  const { templateId } = useResume();
  const [scale, setScale] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState('');
  const [liked, setLiked] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

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
    toast.info(`Zoom: ${Math.round((scale + 0.1) * 100)}%`);
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
    toast.info(`Zoom: ${Math.round((scale - 0.1) * 100)}%`);
  };

  const handleRotate = () => {
    setIsRotating(true);
    toast.success("Template refreshed!");
    setTimeout(() => setIsRotating(false), 1000);
  };

  const handleDownload = () => {
    toast.success("Preparing download...", {
      description: "Your resume will be ready in a moment.",
      duration: 3000,
    });
  };

  const handleShare = () => {
    toast.info("Coming soon!", { 
      description: "Sharing functionality will be available soon.",
      duration: 3000 
    });
  };

  const handlePrint = () => {
    toast.loading("Preparing print version...", { duration: 2000 });
    setTimeout(() => {
      toast.success("Ready to print!", { duration: 3000 });
    }, 2000);
  };

  const handleLike = () => {
    setLiked(prev => !prev);
    if (!liked) {
      toast.success("Added to favorites!", { duration: 2000 });
    } else {
      toast.info("Removed from favorites", { duration: 2000 });
    }
  };

  // Helper function to determine which template to render
  const renderTemplate = () => {
    switch(templateId) {
      case 'professional':
        return <ProfessionalTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      case 'executive':
        return <ExecutiveTemplate />;
      // Handle all new template IDs
      case 'tech-startup':
      case 'corporate-finance':
      case 'healthcare-professional':
      case 'marketing-creative':
      case 'education-academic':
      case 'engineering-professional':
      case 'legal-services':
      case 'data-science':
      case 'hospitality':
        // Default to professional for new templates until they're implemented
        return <ProfessionalTemplate />;
      default:
        return <ProfessionalTemplate />;
    }
  };

  return (
    <motion.div 
      className="relative flex flex-col bg-white shadow-lg rounded-lg w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Controls - Darkened background and controls for better visibility */}
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700 text-white">
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleZoomIn}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
            aria-label="Zoom in"
            onMouseEnter={() => setShowTooltip('zoomIn')}
            onMouseLeave={() => setShowTooltip('')}
          >
            <ZoomIn size={18} className="text-white" />
            {showTooltip === 'zoomIn' && (
              <div className="absolute top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded">
                Zoom In
              </div>
            )}
          </button>
          <button 
            onClick={handleZoomOut}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
            aria-label="Zoom out"
            onMouseEnter={() => setShowTooltip('zoomOut')}
            onMouseLeave={() => setShowTooltip('')}
          >
            <ZoomOut size={18} className="text-white" />
            {showTooltip === 'zoomOut' && (
              <div className="absolute top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded">
                Zoom Out
              </div>
            )}
          </button>
          <span className="text-sm text-white">{Math.round(scale * 100)}%</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button 
            onClick={handleRotate}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors relative"
            aria-label="Refresh template"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip('refresh')}
            onMouseLeave={() => setShowTooltip('')}
          >
            <RefreshCw size={18} className={`text-white ${isRotating ? 'animate-spin' : ''}`} />
            {showTooltip === 'refresh' && (
              <div className="absolute top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded">
                Refresh
              </div>
            )}
          </motion.button>
          
          <motion.button 
            onClick={handleDownload}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors relative"
            aria-label="Download resume"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip('download')}
            onMouseLeave={() => setShowTooltip('')}
          >
            <Download size={18} className="text-white" />
            {showTooltip === 'download' && (
              <div className="absolute top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded">
                Download
              </div>
            )}
          </motion.button>
          
          <motion.button 
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors relative"
            aria-label="Share resume"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip('share')}
            onMouseLeave={() => setShowTooltip('')}
          >
            <Share2 size={18} className="text-white" />
            {showTooltip === 'share' && (
              <div className="absolute top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded">
                Share
              </div>
            )}
          </motion.button>
          
          <motion.button 
            onClick={handlePrint}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors relative"
            aria-label="Print resume"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip('print')}
            onMouseLeave={() => setShowTooltip('')}
          >
            <Printer size={18} className="text-white" />
            {showTooltip === 'print' && (
              <div className="absolute top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded">
                Print
              </div>
            )}
          </motion.button>
          
          <motion.button 
            onClick={handleLike}
            className={`p-2 rounded-full hover:bg-gray-700 transition-colors relative ${liked ? 'text-red-500' : 'text-white'}`}
            aria-label="Like resume"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip('like')}
            onMouseLeave={() => setShowTooltip('')}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            {showTooltip === 'like' && (
              <div className="absolute top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded">
                {liked ? 'Unlike' : 'Like'}
              </div>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Template display area with loading skeleton */}
      <div className="relative flex-1 overflow-auto p-4 bg-gray-50 flex justify-center" ref={previewRef}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              className="w-full max-w-3xl h-[800px] bg-gray-200 rounded overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-20 bg-gray-300 mb-4 animate-pulse"></div>
              <div className="h-10 bg-gray-300 mb-6 w-1/2 mx-auto animate-pulse"></div>
              <div className="h-40 bg-gray-300 mb-4 animate-pulse"></div>
              <div className="h-60 bg-gray-300 animate-pulse"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <RefreshCw size={40} className="text-gray-400 animate-spin mb-4" />
                  <span className="text-gray-500">Loading template...</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="template"
              className={`transition-all duration-300 ${isRotating ? 'animate-scale-in' : ''}`}
              style={{ transform: `scale(${scale})` }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: scale }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-full max-w-3xl h-[800px] overflow-hidden transition-shadow duration-300 hover:shadow-xl relative">
                {renderTemplate()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Quick tips that appear at the bottom - Darkened background for better visibility */}
        {!isLoading && (
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span>Tip: Use the controls above to zoom, print or download your resume</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumePreview;
