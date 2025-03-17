
import React from 'react';
import { useResume } from '../context/ResumeContext';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const ResumePreview: React.FC = () => {
  const { templateId } = useResume();
  
  // Render appropriate template based on templateId
  return (
    <div className="bg-white shadow-lg w-full overflow-hidden">
      {templateId === 'professional' && <ProfessionalTemplate />}
      {templateId === 'creative' && <CreativeTemplate />}
      {templateId === 'minimal' && <MinimalTemplate />}
      {templateId === 'executive' && <ProfessionalTemplate />} {/* Use Professional as fallback for now */}
    </div>
  );
};

export default ResumePreview;
