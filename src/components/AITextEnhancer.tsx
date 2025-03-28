
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AITextEnhancerProps {
  initialText: string;
  onApply: (enhancedText: string) => void;
  type?: 'summary' | 'experience' | 'education';
}

const promptTemplates = {
  summary: "Enhance this professional summary to be more impactful and concise while maintaining the original intent:",
  experience: "Improve this work experience description to highlight achievements and use strong action verbs:",
  education: "Refine this education description to be more professional and highlight key accomplishments:"
};

const AITextEnhancer: React.FC<AITextEnhancerProps> = ({ initialText, onApply, type = 'summary' }) => {
  const [text, setText] = useState(initialText);
  const [enhancedText, setEnhancedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const enhanceText = async () => {
    if (text.trim().length < 20) {
      toast.error('Please provide at least 20 characters for enhancement');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // This would normally call an API endpoint to get enhanced text
      // For now, we'll simulate the response with some basic enhancements
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is a placeholder implementation
      // In a real app, you would call an API like OpenAI
      const prompt = promptTemplates[type] || promptTemplates.summary;
      const simpleEnhance = () => {
        const words = text.split(' ');
        if (type === 'summary') {
          return `Accomplished and innovative ${words.join(' ')}`;
        } else if (type === 'experience') {
          return `Successfully ${words.join(' ')} resulting in significant improvements.`;
        } else {
          return `Excelled in ${words.join(' ')} with outstanding performance.`;
        }
      };
      
      const enhanced = simpleEnhance();
      setEnhancedText(enhanced);
    } catch (err) {
      console.error('Error enhancing text:', err);
      setError('Failed to enhance text. Please try again.');
      toast.error('Failed to enhance text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onApply(enhancedText);
    toast.success('Enhanced text applied!');
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-resumify-beige flex items-center">
          <Sparkles size={18} className="text-yellow-400 mr-2" />
          AI Text Enhancement
        </h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-resumify-off-white block mb-1">Your Text</label>
          <Textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] bg-white bg-opacity-10 border-opacity-20 text-white resize-none"
            placeholder="Enter your text to enhance..."
          />
        </div>
        
        <Button
          onClick={enhanceText}
          disabled={isLoading || text.trim().length < 20}
          className="w-full bg-resumify-brown hover:bg-resumify-brown-dark"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles size={16} className="mr-2" />
              Enhance with AI
            </>
          )}
        </Button>
        
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
        
        {enhancedText && (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-resumify-off-white block mb-1">Enhanced Text</label>
              <Textarea 
                value={enhancedText} 
                onChange={(e) => setEnhancedText(e.target.value)}
                className="min-h-[100px] bg-white bg-opacity-10 border-opacity-20 text-white resize-none"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleApply}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Apply Enhanced Text
              </Button>
              <Button
                onClick={() => setEnhancedText('')}
                variant="outline"
                className="text-resumify-off-white border-gray-700 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITextEnhancer;
