
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Editor from '../components/ResumeEditor';
import Preview from '../components/ResumePreview';
import { useResume } from '../context/ResumeContext';
import { Button } from '../components/ui/button';
import { Download, ArrowLeft, Sparkles } from 'lucide-react';
import { toast } from '../components/ui/use-toast';
import AIWritingAssistant from '../components/AIWritingAssistant';

const ResumeEditorPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { setTemplateId, resumeData } = useResume();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (templateId) {
      setTemplateId(templateId);
    }
  }, [templateId, setTemplateId]);
  
  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    toast({
      title: "Download Started",
      description: "Your resume is being prepared for download.",
    });
  };

  // This would be the selected text from any input field
  const [selectedText, setSelectedText] = useState('');
  
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
          
          <Button
            onClick={handleDownload}
            className="bg-resumify-brown hover:bg-resumify-brown-dark text-white"
          >
            <Download size={16} className="mr-2" /> Download PDF
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Column */}
          <div className="order-2 lg:order-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-resumify-beige">Edit Your Resume</h2>
              {selectedText && <AIWritingAssistant text={selectedText} />}
            </div>
            <Editor />
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-resumify-brown/30">
              <div className="flex items-start gap-3">
                <Sparkles size={20} className="text-yellow-400 mt-1" />
                <div>
                  <h3 className="text-resumify-beige font-medium">AI Writing Assistant</h3>
                  <p className="text-resumify-off-white text-sm mt-1">
                    Select any text in your resume to get AI-powered suggestions for improvement. 
                    The assistant can help with grammar, professional phrasing, and resume optimization.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <a
                      href="https://chat.openai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-resumify-beige transition-colors"
                    >
                      Try ChatGPT
                    </a>
                    <a
                      href="https://grammarly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-resumify-beige transition-colors"
                    >
                      Try Grammarly
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preview Column */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-resumify-beige mb-4">Preview</h2>
            <div className="bg-gray-900 p-4 rounded-lg border border-resumify-brown/30">
              <div className="transform scale-[0.8] origin-top">
                <Preview />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Decorative triangles */}
      <div className="triangle triangle-3"></div>
    </div>
  );
};

export default ResumeEditorPage;
