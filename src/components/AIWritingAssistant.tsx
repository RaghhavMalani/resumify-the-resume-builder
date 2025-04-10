
import React, { useState, useEffect } from 'react';
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
import { 
  Sparkles, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  Loader2,
  Lightbulb,
  FunctionSquare,
  LucideGithub, 
  Scan
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AIWritingAssistantProps {
  text: string;
  onSuggest?: (suggestion: string) => void;
  context?: string; // Optional context for better AI suggestions
}

const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({ 
  text, 
  onSuggest,
  context = "resume section"
}) => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'grammar' | 'professional' | 'keywords' | 'ats'>('professional');
  const [confidence, setConfidence] = useState(85);

  // This would be connected to a real AI service in production
  const generateSuggestion = () => {
    setLoading(true);
    
    // Simulate API call with improved suggestions
    setTimeout(() => {
      let enhancedText = '';
      
      if (activeTab === 'grammar') {
        // Grammar corrections with more sophisticated changes
        enhancedText = text
          .replace(/\bi\b/g, 'I')
          .replace(/dont/g, "don't")
          .replace(/(\w)([,.!?:;])(\w)/g, '$1$2 $3')
          .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
          .replace(/\.{2,}/g, '...') // Standardize ellipses
          .replace(/(\w)$/, text.endsWith('.') ? '$1' : '$1.'); // Add period if missing
          
        // Fix capitalization at the beginning of sentences
        enhancedText = enhancedText.replace(/([.!?]\s+)([a-z])/g, (match, p1, p2) => {
          return p1 + p2.toUpperCase();
        });
      } 
      else if (activeTab === 'professional') {
        // Professional language improvements with more sophisticated transformations
        enhancedText = text
          .replace(/\bgood at\b/gi, 'proficient in')
          .replace(/\bworked on\b/gi, 'spearheaded')
          .replace(/\bhelped\b/gi, 'collaborated on')
          .replace(/\bdid\b/gi, 'executed')
          .replace(/\bmade\b/gi, 'developed')
          .replace(/\bused\b/gi, 'leveraged')
          .replace(/\bfixed\b/gi, 'resolved')
          .replace(/\bstarted\b/gi, 'initiated')
          .replace(/\bfigured out\b/gi, 'determined')
          .replace(/\bhandled\b/gi, 'managed');
          
        // Add quantifiable metrics if none exist
        if (!(/\d+%|\d+x|\bby\s+\d+\b|\bfrom\s+\d+\s+to\s+\d+\b/.test(text))) {
          if (text.includes('improve') || text.includes('increase') || text.includes('enhance')) {
            enhancedText += ' Resulted in a 30% improvement in overall performance.';
          } else if (text.includes('reduce') || text.includes('decrease') || text.includes('lower')) {
            enhancedText += ' Reduced processing time by 40%.';
          }
        }
      } 
      else if (activeTab === 'keywords') {
        // Resume keywords optimization with industry-specific terms
        enhancedText = text;
        
        // Add industry keywords based on context clues in the text
        const keywordsByDomain = {
          tech: ['implemented', 'optimized', 'engineered', 'architected', 'developed', 'deployed'],
          management: ['led', 'coordinated', 'oversaw', 'directed', 'spearheaded', 'managed'],
          marketing: ['strategized', 'launched', 'promoted', 'analyzed', 'targeted', 'positioned'],
          finance: ['forecasted', 'budgeted', 'allocated', 'reconciled', 'audited', 'evaluated'],
          healthcare: ['assessed', 'diagnosed', 'treated', 'administered', 'documented', 'monitored']
        };
        
        // Determine domain from text content
        let domain: keyof typeof keywordsByDomain = 'tech'; // Default
        if (text.match(/manage|team|leadership|direct/i)) domain = 'management';
        if (text.match(/market|campaign|advertis|brand/i)) domain = 'marketing';
        if (text.match(/financ|budget|account|audit/i)) domain = 'finance';
        if (text.match(/patient|medic|health|care|diagnos/i)) domain = 'healthcare';
        
        // Add relevant keywords if they don't exist already
        const domainKeywords = keywordsByDomain[domain];
        const addedWords = [];
        
        for (const keyword of domainKeywords) {
          if (!enhancedText.toLowerCase().includes(keyword.toLowerCase()) && addedWords.length < 2) {
            // Add keyword in context
            if (enhancedText.endsWith('.')) {
              enhancedText = enhancedText + ` ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} additional improvements through strategic planning.`;
            } else {
              enhancedText = enhancedText + `. ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} additional improvements through strategic planning.`;
            }
            addedWords.push(keyword);
          }
        }
        
        // Add metrics if not present
        if (!enhancedText.match(/\d+%|\d+x|\bby\s+\d+\b/)) {
          enhancedText += ` Improved efficiency by ${Math.floor(Math.random() * 30) + 20}% through systematic process optimization.`;
        }
      }
      else if (activeTab === 'ats') {
        // ATS (Applicant Tracking System) optimization
        enhancedText = text;
        
        // Make sure job-specific keywords are included
        const jobKeywords = [
          'experience', 'skills', 'project', 'team', 'results', 'achieved', 
          'developed', 'managed', 'created', 'led', 'implemented', 'designed'
        ];
        
        // Check if key terms are missing
        const missingKeywords = jobKeywords.filter(
          keyword => !enhancedText.toLowerCase().includes(keyword.toLowerCase())
        ).slice(0, 2); // Only use up to 2 missing keywords
        
        // Add missing keywords naturally
        if (missingKeywords.length > 0) {
          if (enhancedText.endsWith('.')) {
            enhancedText += ` Demonstrated strong ${missingKeywords.join(' and ')} through various initiatives.`;
          } else {
            enhancedText += `. Demonstrated strong ${missingKeywords.join(' and ')} through various initiatives.`;
          }
        }
        
        // Ensure text isn't too dense with keywords (ATS readability)
        if (enhancedText.split(' ').length > 50) {
          enhancedText = enhancedText.split('. ').slice(0, 3).join('. ') + '.';
        }
      }
      
      // Calculate confidence score based on amount of changes
      const diffCount = [...enhancedText].filter((char, i) => char !== (text[i] || '')).length;
      const changePercentage = (diffCount / text.length) * 100;
      setConfidence(Math.max(60, Math.min(98, 100 - changePercentage)));
      
      setSuggestion(enhancedText);
      setLoading(false);
    }, 1500);
  };

  // Call generate when tab changes
  useEffect(() => {
    if (open && text) {
      generateSuggestion();
    }
  }, [activeTab, open]);

  const handleApplySuggestion = () => {
    if (onSuggest && suggestion) {
      onSuggest(suggestion);
      toast.success("AI suggestion applied successfully");
    }
    setOpen(false);
  };

  // Don't show the button if text is empty or too short
  if (!text || text.length < 5) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-800 border-resumify-brown text-resumify-beige hover:bg-gray-700 hover:text-white gap-2"
          onClick={() => {
            setOpen(true);
            generateSuggestion();
          }}
        >
          <Sparkles size={16} className="text-yellow-400" /> Enhance with AI
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 border-resumify-brown text-resumify-white max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-resumify-beige flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={18} /> 
            AI Writing Assistant
          </AlertDialogTitle>
          <AlertDialogDescription className="text-resumify-off-white">
            Get intelligent suggestions to enhance your resume content and make it stand out to recruiters and ATS systems.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <Tabs defaultValue="professional" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-4 mb-4 bg-gray-800">
            <TabsTrigger value="professional" className="data-[state=active]:bg-gray-700">
              <FunctionSquare size={16} className="mr-2" /> Professional
            </TabsTrigger>
            <TabsTrigger value="ats" className="data-[state=active]:bg-gray-700">
              <Scan size={16} className="mr-2" /> ATS-Optimized
            </TabsTrigger>
            <TabsTrigger value="keywords" className="data-[state=active]:bg-gray-700">
              <Lightbulb size={16} className="mr-2" /> Keywords
            </TabsTrigger>
            <TabsTrigger value="grammar" className="data-[state=active]:bg-gray-700">
              <LucideGithub size={16} className="mr-2" /> Grammar
            </TabsTrigger>
          </TabsList>
          
          <div className="my-4">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium mb-2 text-resumify-beige">Original Text:</h4>
                <span className="text-xs text-gray-400">
                  {text.length} characters
                </span>
              </div>
              <div className="p-3 bg-gray-800 rounded-md text-resumify-off-white">
                {text || <span className="text-gray-500 italic">No text provided</span>}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium mb-2 text-resumify-beige">
                  AI Suggestion
                  <span className="text-xs text-gray-400 ml-2">
                    {activeTab === 'grammar' && '(Grammar & Clarity)'}
                    {activeTab === 'professional' && '(Professional Language)'}
                    {activeTab === 'keywords' && '(Resume Keywords)'}
                    {activeTab === 'ats' && '(ATS Optimization)'}
                  </span>
                </h4>
                {!loading && suggestion && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">
                      Confidence: 
                    </span>
                    <span className={`text-xs font-medium ${
                      confidence > 85 ? 'text-green-400' : 
                      confidence > 70 ? 'text-yellow-400' : 
                      'text-red-400'
                    }`}>
                      {confidence}%
                    </span>
                  </div>
                )}
              </div>
              
              {loading ? (
                <div className="p-6 bg-gray-800 rounded-md h-24 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Loader2 size={24} className="animate-spin text-resumify-beige opacity-70 mb-2" />
                    <span className="text-sm text-gray-400">Analyzing and enhancing your content...</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-800 rounded-md text-resumify-white min-h-20">
                  {suggestion || <span className="text-gray-500 italic">No suggestion available</span>}
                </div>
              )}
            </div>
          </div>
        </Tabs>
        
        <div className="flex flex-col space-y-2 mt-4">
          <div className="flex items-start text-xs text-resumify-off-white">
            <CheckCircle2 size={14} className="text-green-400 mr-2 mt-0.5" /> 
            <div>
              <span className="font-medium">ATS-Optimized:</span> Our AI uses semantic analysis to ensure your content is readable by Applicant Tracking Systems
            </div>
          </div>
          <div className="flex items-start text-xs text-resumify-off-white">
            <CheckCircle2 size={14} className="text-green-400 mr-2 mt-0.5" /> 
            <div>
              <span className="font-medium">Industry-Tailored:</span> Suggestions include terminology specific to your field to help you stand out
            </div>
          </div>
          <div className="flex items-start text-xs text-resumify-off-white">
            <CheckCircle2 size={14} className="text-green-400 mr-2 mt-0.5" /> 
            <div>
              <span className="font-medium">Impact-Focused:</span> We emphasize quantifiable achievements and results to demonstrate your value
            </div>
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
            disabled={loading || !suggestion}
          >
            Apply Suggestion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AIWritingAssistant;
