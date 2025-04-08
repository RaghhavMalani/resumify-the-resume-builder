
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
  Printer, 
  Heart,
  Loader2,
  Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { exportElementAsPdf } from '../utils/pdfExport';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const ResumePreview: React.FC = () => {
  const { templateId, resumeData } = useResume();
  const [scale, setScale] = useState(0.8);
  const [isRotating, setIsRotating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTipPopup, setShowTipPopup] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [templateId]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [templateId]);

  // Show tip popup after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTipPopup(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.2));
    toast.info(`Zoom: ${Math.round((scale + 0.1) * 100)}%`);
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.4));
    toast.info(`Zoom: ${Math.round((scale - 0.1) * 100)}%`);
  };

  const handleRotate = () => {
    setIsRotating(true);
    toast.success("Template refreshed!");
    setTimeout(() => setIsRotating(false), 1000);
  };

  const handleDownload = async () => {
    if (!templateRef.current) {
      toast.error("Preview not ready. Please try again.");
      return;
    }
    
    try {
      setIsDownloading(true);
      const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume_${templateId}.pdf`;
      
      await exportElementAsPdf(templateRef.current, {
        filename: fileName,
        quality: 5, // Increased quality for better results
        scale: 4,   // Higher scale for better resolution
        pdfOptions: {
          compress: true
        }
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download resume");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCloseTip = () => {
    setShowTipPopup(false);
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
      if (templateRef.current) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          const documentContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Print Resume</title>
              <style>
                @media print {
                  body { margin: 0; }
                  .resume-container { width: 100%; height: 100%; }
                }
              </style>
            </head>
            <body>
              <div class="resume-container">
                ${templateRef.current.outerHTML}
              </div>
              <script>
                window.onload = function() { window.print(); window.close(); }
              </script>
            </body>
            </html>
          `;
          printWindow.document.open();
          printWindow.document.write(documentContent);
          printWindow.document.close();
          toast.success("Ready to print!", { duration: 3000 });
        } else {
          toast.error("Print window was blocked. Please allow popups.");
        }
      }
    }, 1000);
  };

  const handleLike = () => {
    setLiked(prev => !prev);
    if (!liked) {
      toast.success("Added to favorites!", { duration: 2000 });
    } else {
      toast.info("Removed from favorites", { duration: 2000 });
    }
  };

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
      case 'tech-startup':
      case 'engineering-professional':
      case 'data-science':
        return <ProfessionalTemplate />;
      case 'corporate-finance':
      case 'legal-services':
        return <ExecutiveTemplate />;
      case 'marketing-creative':
      case 'hospitality':
        return <CreativeTemplate />;
      case 'healthcare-professional':
      case 'education-academic':
        return <MinimalTemplate />;
      default:
        return <ProfessionalTemplate />;
    }
  };

  return (
    <motion.div 
      className="relative flex flex-col bg-white shadow-xl rounded-lg w-full overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fixed position tip popup - positioned at the bottom of the viewport, not overlapping the resume */}
      <AnimatePresence>
        {showTipPopup && !isLoading && (
          <motion.div 
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/95 text-white px-5 py-3 rounded-full shadow-lg z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <Info size={18} className="text-blue-400 flex-shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">
                Tip: Use the controls above to zoom, print or download your resume
              </span>
              <button 
                onClick={handleCloseTip}
                className="ml-2 rounded-full hover:bg-gray-700 p-1 text-gray-300 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Controls positioned above the resume */}
      <div className="sticky top-0 z-10 bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700 text-white">
        <div className="flex items-center space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleZoomIn}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
                  aria-label="Zoom in"
                >
                  <ZoomIn size={18} className="text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleZoomOut}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
                  aria-label="Zoom out"
                >
                  <ZoomOut size={18} className="text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <span className="text-sm text-white">{Math.round(scale * 100)}%</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  onClick={handleRotate}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Refresh template"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isDownloading}
                >
                  <RefreshCw size={18} className={`text-white ${isRotating ? 'animate-spin' : ''}`} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  onClick={handleDownload}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Download resume"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <Loader2 size={18} className="text-white animate-spin" />
                  ) : (
                    <Download size={18} className="text-white" />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Share resume"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 size={18} className="text-white" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  onClick={handlePrint}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Print resume"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Printer size={18} className="text-white" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Print</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  onClick={handleLike}
                  className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${liked ? 'text-red-500' : 'text-white'}`}
                  aria-label="Like resume"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={18} fill={liked ? "currentColor" : "none"} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{liked ? 'Unlike' : 'Like'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="relative flex-1 overflow-auto p-6 bg-gray-100 flex justify-center items-center" ref={previewRef}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              className="w-full max-w-4xl h-[800px] bg-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-32 bg-gray-300 mb-4 animate-pulse"></div>
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
              className="transition-all duration-300"
              style={{ transformOrigin: 'center', transform: `scale(${scale})` }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: scale }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div 
                ref={templateRef}
                className="w-[210mm] h-[297mm] min-w-[210mm] max-h-[297mm] overflow-hidden shadow-2xl bg-white"
              >
                {renderTemplate()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ResumePreview;
