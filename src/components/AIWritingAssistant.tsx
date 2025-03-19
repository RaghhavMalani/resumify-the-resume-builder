
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
import { Sparkles, CheckCircle2, X, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AIWritingAssistantProps {
  text: string;
  onSuggest?: (suggestion: string) => void;
}

const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({ text, onSuggest }) => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // This would be connected to a real AI service in production
  const generateSuggestion = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock improved text
      const improved = text
        .replace(/i /g, 'I ')
        .replace(/dont/g, "don't")
        .replace(/(\w)$/, '$1.')
        .replace(/(\w)([,.!?:;])(\w)/g, '$1$2 $3');
        
      // Add professional language improvements
      let enhancedText = improved;
      if (text.includes('good at')) {
        enhancedText = enhancedText.replace('good at', 'proficient in');
      }
      if (text.includes('worked on')) {
        enhancedText = enhancedText.replace('worked on', 'spearheaded');
      }
      if (text.includes('helped')) {
        enhancedText = enhancedText.replace('helped', 'collaborated on');
      }
      
      setSuggestion(enhancedText);
      setLoading(false);
    }, 1500);
  };

  const handleApplySuggestion = () => {
    if (onSuggest && suggestion) {
      onSuggest(suggestion);
      toast({
        title: "Suggestion applied",
        description: "The AI-enhanced text has been applied to your resume.",
        duration: 3000,
      });
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
          <Sparkles size={16} /> Enhance with AI
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 border-resumify-brown text-resumify-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-resumify-beige flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={18} /> 
            AI Writing Enhancement
          </AlertDialogTitle>
          <AlertDialogDescription className="text-resumify-off-white">
            The AI assistant can help improve your text to make it more professional and error-free.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="my-4">
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 text-resumify-beige">Original Text:</h4>
            <div className="p-3 bg-gray-800 rounded-md text-resumify-off-white">
              {text}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 text-resumify-beige">AI Suggestion:</h4>
            {loading ? (
              <div className="p-3 bg-gray-800 rounded-md h-20 flex items-center justify-center">
                <div className="animate-pulse flex gap-1">
                  <div className="h-2 w-2 bg-resumify-beige rounded-full"></div>
                  <div className="h-2 w-2 bg-resumify-beige rounded-full animation-delay-200"></div>
                  <div className="h-2 w-2 bg-resumify-beige rounded-full animation-delay-400"></div>
                </div>
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
            Grammar and spelling checked
          </div>
          <div className="flex items-center text-xs text-resumify-off-white">
            <CheckCircle2 size={14} className="text-green-400 mr-2" /> 
            Professional language enhanced
          </div>
          <div className="flex items-center text-xs text-resumify-off-white">
            <CheckCircle2 size={14} className="text-green-400 mr-2" /> 
            Resume-optimized phrasing
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
