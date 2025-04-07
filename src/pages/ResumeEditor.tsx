
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Editor from '../components/ResumeEditor';
import Preview from '../components/ResumePreview';
import { useResume } from '../context/ResumeContext';
import { Button } from '../components/ui/button';
import { 
  Download, 
  ArrowLeft, 
  Sparkles, 
  Camera, 
  Save, 
  Save as Save2,
  Share2,
  PanelLeftClose 
} from 'lucide-react';
import { toast } from 'sonner';
import AIWritingAssistant from '../components/AIWritingAssistant';
import { exportElementAsPdf } from '../utils/pdfExport';
import BackendService from '../services/BackendService';

const ResumeEditorPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { setTemplateId, resumeData } = useResume();
  const navigate = useNavigate();
  const [selectedText, setSelectedText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (templateId) {
      setTemplateId(templateId);
    }
  }, [templateId, setTemplateId]);
  
  // Example of how to capture selected text from fields
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString());
      }
    };
    
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleDownload = async () => {
    if (!previewRef.current) {
      toast.error("Could not generate PDF. Please try again.");
      return;
    }

    try {
      toast.info('Preparing your resume for download...', { duration: 3000 });
      const success = await exportElementAsPdf(previewRef.current, {
        filename: `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`,
        quality: 2,
        scale: 2
      });
      
      if (success) {
        toast.success('Resume downloaded successfully!');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume. Please try again.');
    }
  };

  const handleSaveResume = async () => {
    try {
      setIsSaving(true);
      // Check backend status
      const status = await BackendService.checkStatus();
      
      if (!status) {
        toast.error("Backend service is not available. Resume will not be saved.");
        return;
      }
      
      // Create or update resume
      const title = resumeData.personalInfo.name 
        ? `${resumeData.personalInfo.name}'s Resume` 
        : 'Untitled Resume';
      
      await BackendService.createResume(templateId || 'professional', title, resumeData);
      
      toast.success("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-resumify-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            className="text-resumify-beige border-resumify-beige bg-gray-800 hover:bg-gray-700 hover:text-white"
            onClick={() => navigate('/templates')}
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Templates
          </Button>
          
          <div className="flex gap-2">
            <Button
              onClick={handleSaveResume}
              disabled={isSaving}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save size={16} className="mr-2" /> Save
                </>
              )}
            </Button>
            
            <Button
              onClick={handleDownload}
              className="bg-resumify-brown hover:bg-resumify-brown-dark text-white"
            >
              <Download size={16} className="mr-2" /> Download PDF
            </Button>
          </div>
        </div>
        
        <div className={`grid grid-cols-1 ${isCollapsed ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-8`}>
          {/* Editor Column */}
          <div className="order-2 lg:order-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-resumify-beige">Edit Your Resume</h2>
              {selectedText && <AIWritingAssistant text={selectedText} />}
            </div>
            
            {/* New feature alert */}
            <div className="bg-resumify-brown/20 border border-resumify-brown/40 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Sparkles size={24} className="text-resumify-beige mt-1" />
              <div>
                <h3 className="text-resumify-beige font-medium">New: AI-Enhanced Text</h3>
                <p className="text-resumify-off-white text-sm mt-1">
                  Use our new AI text enhancement powered by ChatGPT and Grammarly to make your resume stand out.
                  Click on the "AI Enhance" button in each section to transform your content.
                </p>
              </div>
            </div>
            
            <Editor />
          </div>
          
          {/* Preview Column */}
          {!isCollapsed && (
            <div className="order-1 lg:order-2 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-resumify-beige">Preview</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-resumify-beige border-resumify-beige bg-gray-800 hover:bg-gray-700"
                  onClick={() => setIsCollapsed(true)}
                >
                  <PanelLeftClose size={16} className="mr-1" /> Hide Preview
                </Button>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-resumify-brown/30">
                <div ref={previewRef} className="transform scale-[0.8] origin-top">
                  <Preview />
                </div>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="fixed bottom-6 right-6">
              <Button
                className="bg-resumify-brown hover:bg-resumify-brown-dark text-white rounded-full h-12 w-12 shadow-lg"
                onClick={() => setIsCollapsed(false)}
              >
                <ArrowLeft size={20} />
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Decorative triangles */}
      <div className="triangle triangle-3"></div>
    </div>
  );
};

export default ResumeEditorPage;
