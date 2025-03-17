
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Editor from '../components/ResumeEditor';
import Preview from '../components/ResumePreview';
import { useResume } from '../context/ResumeContext';
import { Button } from '../components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

const ResumeEditorPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { setTemplateId } = useResume();
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
  
  return (
    <div className="min-h-screen bg-resumify-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            className="text-resumify-beige border-resumify-beige hover:bg-resumify-beige hover:text-resumify-background"
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
            <h2 className="text-2xl font-bold text-resumify-beige mb-4">Edit Your Resume</h2>
            <Editor />
          </div>
          
          {/* Preview Column */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-resumify-beige mb-4">Preview</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
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
