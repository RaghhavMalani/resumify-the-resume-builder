
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles, Loader2, ArrowRight, CheckCircle2, Wand2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

const aiProviders = [
  { id: 'chatgpt', name: 'ChatGPT', logo: '✨', color: 'bg-green-600' },
  { id: 'grammarly', name: 'Grammarly', logo: 'G', color: 'bg-purple-600' }
];

const AITextEnhancer: React.FC<AITextEnhancerProps> = ({ initialText, onApply, type = 'summary' }) => {
  const [text, setText] = useState(initialText);
  const [enhancedText, setEnhancedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(aiProviders[0].id);
  const [enhancementStrength, setEnhancementStrength] = useState('moderate');

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
      
      // Simulate different AI providers giving different responses
      const prompt = promptTemplates[type] || promptTemplates.summary;
      let enhanced = '';
      
      if (selectedProvider === 'chatgpt') {
        // Simulate ChatGPT style enhancement
        enhanced = simulateChatGptEnhancement(text, enhancementStrength, type);
      } else {
        // Simulate Grammarly style enhancement
        enhanced = simulateGrammarlyEnhancement(text, enhancementStrength);
      }
      
      setEnhancedText(enhanced);
      toast.success(`Enhanced with ${selectedProvider === 'chatgpt' ? 'ChatGPT' : 'Grammarly'}`);
    } catch (err) {
      console.error('Error enhancing text:', err);
      setError('Failed to enhance text. Please try again.');
      toast.error('Failed to enhance text');
    } finally {
      setIsLoading(false);
    }
  };

  const simulateChatGptEnhancement = (text: string, strength: string, type: string) => {
    // Very basic simulation of how ChatGPT might enhance text
    let result = text;
    
    // First, fix basic grammar and capitalization
    result = result.replace(/\bi\b/g, 'I')
      .replace(/\s{2,}/g, ' ')
      .replace(/\.{2,}/g, '.')
      .replace(/\s+([,\.\?!])/g, '$1')
      .trim();
    
    // Add profession-specific enhancements based on type
    if (type === 'summary') {
      // For professional summaries
      if (!result.includes('professional')) {
        result = result.replace(/^/, 'Accomplished professional with ');
      }
      if (!result.includes('expertise')) {
        result += ' Demonstrating expertise in delivering high-quality results.';
      }
    } else if (type === 'experience') {
      // For experience descriptions
      result = result.replace(/worked on/gi, 'spearheaded')
        .replace(/helped/gi, 'collaborated to')
        .replace(/made/gi, 'developed')
        .replace(/used/gi, 'leveraged')
        .replace(/good/gi, 'exceptional');
        
      if (!result.includes('%') && strength === 'strong') {
        result += ' Resulting in 25% improvement in efficiency.';
      }
    } else {
      // For education
      result = result.replace(/studied/gi, 'specialized in')
        .replace(/learned/gi, 'mastered')
        .replace(/got/gi, 'earned');
    }
    
    // Add strength-based enhancements
    if (strength === 'light') {
      // Just clean up the text, already done above
    } else if (strength === 'moderate') {
      // Add some professional language
      result = result.replace(/did/gi, 'executed')
        .replace(/created/gi, 'developed')
        .replace(/finished/gi, 'successfully completed');
    } else if (strength === 'strong') {
      // Make it more impactful with stronger words
      result = result.replace(/did/gi, 'orchestrated')
        .replace(/created/gi, 'pioneered')
        .replace(/finished/gi, 'delivered');
        
      // Add power phrases if they don't already exist
      if (!result.includes('result')) {
        result += ' Resulting in significant improvements to overall performance.';
      }
    }
    
    return result;
  };
  
  const simulateGrammarlyEnhancement = (text: string, strength: string) => {
    // Very basic simulation of how Grammarly might enhance text
    let result = text;
    
    // Fix basic grammar issues
    result = result.replace(/\bi\b/g, 'I')
      .replace(/dont/g, "don't")
      .replace(/cant/g, "can't")
      .replace(/wont/g, "won't")
      .replace(/hasnt/g, "hasn't")
      .replace(/didnt/g, "didn't")
      .replace(/\s{2,}/g, ' ')
      .replace(/\s+([,\.\?!])/g, '$1');
      
    // Sentence structure improvements based on strength
    if (strength === 'light') {
      // Just fix basic errors
    } else if (strength === 'moderate') {
      // Replace weak verbs
      result = result.replace(/very /gi, '')
        .replace(/really /gi, '')
        .replace(/a lot of/gi, 'numerous')
        .replace(/lots of/gi, 'substantial')
        .replace(/many/gi, 'numerous');
    } else if (strength === 'strong') {
      // More advanced replacements
      result = result.replace(/very /gi, '')
        .replace(/really /gi, '')
        .replace(/a lot of/gi, 'numerous')
        .replace(/lots of/gi, 'substantial')
        .replace(/many/gi, 'numerous')
        .replace(/good/gi, 'excellent')
        .replace(/bad/gi, 'challenging')
        .replace(/big/gi, 'significant')
        .replace(/small/gi, 'precise');
    }
    
    // Ensure proper punctuation at the end
    if (!/[.!?]$/.test(result)) {
      result += '.';
    }
    
    return result;
  };

  const handleApply = () => {
    onApply(enhancedText);
    toast.success('Enhanced text applied!');
  };
  
  const handleStrengthChange = (strength: string) => {
    setEnhancementStrength(strength);
    if (enhancedText) {
      // Re-enhance with new strength if we already have enhanced text
      setIsLoading(true);
      setTimeout(() => {
        const newEnhanced = selectedProvider === 'chatgpt' 
          ? simulateChatGptEnhancement(text, strength, type)
          : simulateGrammarlyEnhancement(text, strength);
        setEnhancedText(newEnhanced);
        setIsLoading(false);
      }, 500);
    }
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
        <div className="flex items-center space-x-2 mb-4">
          <p className="text-sm text-resumify-off-white">Enhance with:</p>
          <div className="flex space-x-2">
            {aiProviders.map((provider) => (
              <button
                key={provider.id}
                className={cn(
                  "flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  selectedProvider === provider.id 
                    ? `${provider.color} text-white` 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <span className="mr-1">{provider.logo}</span>
                {provider.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-resumify-off-white block">Enhancement Strength:</label>
            <div className="flex space-x-1">
              {['light', 'moderate', 'strong'].map((strength) => (
                <button
                  key={strength}
                  className={cn(
                    "px-2 py-0.5 text-xs rounded transition-colors",
                    enhancementStrength === strength
                      ? "bg-resumify-brown text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                  onClick={() => handleStrengthChange(strength)}
                >
                  {strength.charAt(0).toUpperCase() + strength.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
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
              <Wand2 size={16} className="mr-2" />
              Enhance with {selectedProvider === 'chatgpt' ? 'ChatGPT' : 'Grammarly'}
            </>
          )}
        </Button>
        
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
        
        {enhancedText && (
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-resumify-off-white block">Enhanced Text</label>
                <Button
                  variant="ghost" 
                  size="sm"
                  className="h-6 text-xs text-resumify-off-white hover:text-white"
                  onClick={enhanceText}
                >
                  <RefreshCw size={12} className="mr-1" /> Regenerate
                </Button>
              </div>
              <Textarea 
                value={enhancedText} 
                onChange={(e) => setEnhancedText(e.target.value)}
                className="min-h-[100px] bg-white bg-opacity-10 border-opacity-20 text-white resize-none"
              />
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center text-xs text-green-400">
                <CheckCircle2 size={14} className="mr-1" />
                Improved by {selectedProvider === 'chatgpt' ? 'ChatGPT' : 'Grammarly'}
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AITextEnhancer;
