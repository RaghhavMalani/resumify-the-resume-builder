
import React, { useState } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, X, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AIWritingAssistantProps {
  text: string;
  onSuggest?: (suggestion: string) => void;
}

const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({ text, onSuggest }) => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'grammar' | 'professional' | 'keywords'>('grammar');

  // This would be connected to a real AI service in production
  const generateSuggestion = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Generate suggestions based on the active tab
      let enhancedText = '';
      
      if (activeTab === 'grammar') {
        // Grammar corrections
        enhancedText = text
          .replace(/i /g, 'I ')
          .replace(/dont/g, "don't")
          .replace(/(\w)$/, '$1.')
          .replace(/(\w)([,.!?:;])(\w)/g, '$1$2 $3');
      } else if (activeTab === 'professional') {
        // Professional language improvements
        enhancedText = text;
        if (text.includes('good at')) {
          enhancedText = enhancedText.replace('good at', 'proficient in');
        }
        if (text.includes('worked on')) {
          enhancedText = enhancedText.replace('worked on', 'spearheaded');
        }
        if (text.includes('helped')) {
          enhancedText = enhancedText.replace('helped', 'collaborated on');
        }
        if (text.includes('did')) {
          enhancedText = enhancedText.replace('did', 'executed');
        }
        if (text.includes('made')) {
          enhancedText = enhancedText.replace('made', 'developed');
        }
      } else {
        // Resume keywords optimization
        enhancedText = text;
        // Add industry keywords if they don't exist
        const keywords = ['implemented', 'optimized', 'managed', 'achieved', 'increased', 'decreased'];
        const addedWords = [];
        
        for (const keyword of keywords) {
          if (!enhancedText.toLowerCase().includes(keyword) && addedWords.length < 2) {
            enhancedText = `${keyword} ${enhancedText.toLowerCase()}`;
            addedWords.push(keyword);
          }
        }
        
        // Add a quantifiable result if not present
        if (!enhancedText.includes('%') && !enhancedText.includes('increased')) {
          enhancedText += ' Increased efficiency by 20% through process optimization.';
        }
      }
      
      setSuggestion(enhancedText);
      setLoading(false);
    }, 1500);
  };

  const handleApplySuggestion = () => {
    if (onSuggest && suggestion) {
      onSuggest(suggestion);
      toast.success("AI suggestion applied successfully");
    }
    setOpen(false);
  };

  // Don't show the button if text is empty or too short
  if (!text || text.length < 10) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto mt-1 bg-gray-800 border-resumify-brown text-resumify-beige hover:bg-gray-700 hover:text-white gap-2"
          onClick={() => {
            setOpen(true);
            generateSuggestion();
          }}
        >
          <Sparkles size={16} className="text-yellow-400" /> Enhance with AI
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 border-resumify-brown text-resumify-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-resumify-beige flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={18} /> 
            AI Writing Enhancement
          </AlertDialogTitle>
          <AlertDialogDescription className="text-resumify-off-white">
            Get intelligent suggestions to enhance your resume content and make it stand out.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'grammar' ? 'text-resumify-beige border-b-2 border-resumify-brown' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => {
              setActiveTab('grammar');
              setLoading(true);
              setTimeout(() => {
                generateSuggestion();
              }, 500);
            }}
          >
            Grammar
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'professional' ? 'text-resumify-beige border-b-2 border-resumify-brown' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => {
              setActiveTab('professional');
              setLoading(true);
              setTimeout(() => {
                generateSuggestion();
              }, 500);
            }}
          >
            Professional
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'keywords' ? 'text-resumify-beige border-b-2 border-resumify-brown' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => {
              setActiveTab('keywords');
              setLoading(true);
              setTimeout(() => {
                generateSuggestion();
              }, 500);
            }}
          >
            Keywords
          </button>
        </div>
        
        <div className="my-4">
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 text-resumify-beige">Original Text:</h4>
            <div className="p-3 bg-gray-800 rounded-md text-resumify-off-white">
              {text}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 text-resumify-beige">
              AI Suggestion 
              <span className="text-xs text-gray-400 ml-2">
                {activeTab === 'grammar' && '(Grammar & Clarity)'}
                {activeTab === 'professional' && '(Professional Language)'}
                {activeTab === 'keywords' && '(Resume Keywords)'}
              </span>
            </h4>
            {loading ? (
              <div className="p-3 bg-gray-800 rounded-md h-20 flex items-center justify-center">
                <Loader2 size={24} className="animate-spin text-resumify-beige opacity-70" />
              </div>
            ) : (
              <div className="p-3 bg-gray-800 rounded-md text-resumify-white">
                {suggestion}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center text-xs text-resumify-off-white">
            <CheckCircle2 size={14} className="text-green-400 mr-2" /> 
            Optimized for ATS (Applicant Tracking Systems)
          </div>
          <div className="flex items-center text-xs text-resumify-off-white">
            <CheckCircle2 size={14} className="text-green-400 mr-2" /> 
            Industry-standard terminology
          </div>
          <div className="flex items-center text-xs text-resumify-off-white">
            <CheckCircle2 size={14} className="text-green-400 mr-2" /> 
            Improved readability and professionalism
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 mb-2 text-xs text-resumify-off-white">
          <a 
            href="https://grammarly.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-resumify-beige"
          >
            Try Grammarly <ExternalLink size={12} className="ml-1" />
          </a>
          <a 
            href="https://chat.openai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-resumify-beige"
          >
            Try ChatGPT <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
        
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="bg-gray-800 text-resumify-white hover:bg-gray-700 border-gray-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-resumify-brown text-white hover:bg-resumify-brown-dark"
            onClick={handleApplySuggestion}
            disabled={loading}
          >
            Apply Suggestion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AIWritingAssistant;
