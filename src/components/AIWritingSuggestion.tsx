
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Bot, ExternalLink, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface AIWritingSuggestionProps {
  text: string;
  onApply?: (improvedText: string) => void;
}

const AIWritingSuggestion: React.FC<AIWritingSuggestionProps> = ({ text, onApply }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedText, setEnhancedText] = useState('');
  
  const needsImprovement = text && text.length > 0 && (
    text.length < 50 || 
    text.includes('responsible for') || 
    text.includes('worked on') ||
    text.includes('duties included') ||
    text.includes('helped with') ||
    !text.includes(' ') || // Single word
    text.split(' ').length < 5 // Very short phrase
  );

  if (!needsImprovement) return null;

  const getImprovementSuggestions = () => {
    const suggestions = [];
    
    if (text.length < 50) {
      suggestions.push("Add more detail to make your description more comprehensive");
    }
    
    if (text.includes('responsible for')) {
      suggestions.push("Replace 'responsible for' with stronger action verbs like 'managed', 'led', or 'directed'");
    }
    
    if (text.includes('worked on')) {
      suggestions.push("Replace 'worked on' with action verbs like 'developed', 'implemented', or 'executed'");
    }
    
    if (text.includes('duties included')) {
      suggestions.push("Replace 'duties included' with specific accomplishments and actions");
    }
    
    if (text.includes('helped with')) {
      suggestions.push("Replace 'helped with' with 'collaborated on', 'contributed to', or specific actions");
    }
    
    if (!text.includes(' ') || text.split(' ').length < 5) {
      suggestions.push("Expand your description with more details about skills, technologies, or measurable results");
    }
    
    if (!text.match(/\d+%/) && !text.match(/\d+ percent/)) {
      suggestions.push("Consider adding measurable achievements (e.g., 'increased efficiency by 25%')");
    }
    
    return suggestions;
  };

  const handleSuggestImprovement = () => {
    setIsEnhancing(true);
    
    // Simulate AI enhancement
    setTimeout(() => {
      let improved = text;
      
      // Replace weak phrases with stronger alternatives
      improved = improved
        .replace(/responsible for/gi, 'managed')
        .replace(/worked on/gi, 'developed')
        .replace(/duties included/gi, 'accomplished')
        .replace(/helped with/gi, 'collaborated on');
        
      // Add measurement if missing and text is about improvement
      if (
        (improved.includes('improv') || 
         improved.includes('increas') || 
         improved.includes('enhanc') || 
         improved.includes('optimiz')) && 
        !improved.includes('%')
      ) {
        improved += ' resulting in a 20% efficiency improvement';
      }
      
      // Add technologies if it seems like a technical role
      if (
        (improved.includes('develop') || 
         improved.includes('programm') || 
         improved.includes('engineer') || 
         improved.includes('code')) && 
        !improved.includes('using')
      ) {
        improved += ' using modern technologies and best practices';
      }
      
      // Add leadership component if it seems like a management role
      if (
        (improved.includes('manage') || 
         improved.includes('lead') || 
         improved.includes('direct') || 
         improved.includes('supervis')) && 
        !improved.includes('team')
      ) {
        improved += ' while effectively guiding cross-functional teams';
      }
      
      // Ensure proper sentence structure
      improved = improved.trim();
      if (!/[.!?]$/.test(improved)) {
        improved += '.';
      }
      
      setEnhancedText(improved);
      setIsEnhancing(false);
    }, 1500);
    
    toast.success("AI Writing Assistant activated", {
      description: "Analyzing your text and generating improvements...",
      duration: 3000,
    });
  };

  const handleApplyEnhancement = () => {
    if (onApply && enhancedText) {
      onApply(enhancedText);
      toast.success("Enhanced text applied successfully");
    }
  };

  const handleGrammarly = () => {
    window.open('https://www.grammarly.com/', '_blank');
  };

  return (
    <motion.div
      className="mt-2 p-3 bg-gray-800 rounded-md border border-resumify-brown/30 text-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div className="flex items-start gap-3">
        <Lightbulb className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium">Writing Suggestions</h4>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-400 hover:text-white"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          
          <p className="text-sm text-gray-300 mb-2">
            This section could be stronger. Consider adding specific achievements, metrics, or using more powerful action verbs.
          </p>
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3"
            >
              <div className="bg-gray-700/50 p-2 rounded text-sm text-gray-300 mt-2 mb-3">
                <p className="font-medium text-resumify-beige mb-1">Suggestions for improvement:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {getImprovementSuggestions().map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
              
              {enhancedText && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-resumify-beige mb-1">AI Enhanced Version:</p>
                  <div className="p-2 bg-gray-700/50 rounded text-sm">
                    {enhancedText}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button 
                      size="sm" 
                      className="h-7 text-xs bg-resumify-brown hover:bg-resumify-brown-dark"
                      onClick={handleApplyEnhancement}
                    >
                      <CheckCircle2 size={12} className="mr-1" />
                      Apply Enhancement
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={handleSuggestImprovement}
              disabled={isEnhancing}
              className="flex items-center gap-1 text-xs bg-resumify-brown/70 hover:bg-resumify-brown text-white px-3 py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Bot size={14} />
              {isEnhancing ? 'Enhancing...' : 'Improve with AI'}
            </button>
            <button
              onClick={handleGrammarly}
              className="flex items-center gap-1 text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded transition-colors"
            >
              <ExternalLink size={14} />
              Check with Grammarly
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIWritingSuggestion;
