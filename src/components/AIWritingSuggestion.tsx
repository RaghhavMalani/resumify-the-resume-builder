
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Bot, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface AIWritingSuggestionProps {
  text: string;
}

const AIWritingSuggestion: React.FC<AIWritingSuggestionProps> = ({ text }) => {
  const needsImprovement = text && text.length > 0 && (
    text.length < 50 || 
    text.includes('responsible for') || 
    text.includes('worked on') ||
    text.includes('duties included')
  );

  if (!needsImprovement) return null;

  const handleSuggestImprovement = () => {
    toast.success("AI Writing Assistant activated", {
      description: "Let's improve this section with stronger action verbs and quantifiable achievements.",
      duration: 5000,
    });
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
        <div>
          <h4 className="font-medium mb-1">Writing Suggestion</h4>
          <p className="text-sm text-gray-300 mb-2">
            This section could be stronger. Consider adding specific achievements, metrics, or using more powerful action verbs.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={handleSuggestImprovement}
              className="flex items-center gap-1 text-xs bg-resumify-brown/70 hover:bg-resumify-brown text-white px-3 py-1.5 rounded transition-colors"
            >
              <Bot size={14} />
              Improve with AI
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
