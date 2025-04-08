
import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { 
  Plus, 
  Trash2, 
  Camera, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeEditor: React.FC = () => {
  const {
    resumeData,
    updatePersonalInfo,
    updateSummary,
    addEducation,
    updateEducation,
    removeEducation,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addSkill,
    updateSkill,
    removeSkill
  } = useResume();

  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<string | null>(null);
  const [showTips, setShowTips] = useState({
    personal: true,
    summary: true,
    education: true,
    experience: true,
    skills: true
  });

  // Handler for profile photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Photo size should be less than 2MB");
      return;
    }
    
    // Check file type
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      toast.error("Only JPG and PNG images are supported");
      return;
    }
    
    // Convert to base64 for preview
    const reader = new FileReader();
    reader.onload = (event) => {
      updatePersonalInfo({ photoUrl: event.target?.result as string });
      toast.success("Profile photo updated!");
    };
    reader.onerror = () => {
      toast.error("Failed to upload image. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  // Handler to remove profile photo
  const removePhoto = () => {
    updatePersonalInfo({ photoUrl: undefined });
    toast.success("Profile photo removed");
  };

  // Toggle expanded sections
  const toggleExpanded = (section: 'exp' | 'edu', id: string) => {
    if (section === 'exp') {
      setExpandedExp(expandedExp === id ? null : id);
    } else {
      setExpandedEdu(expandedEdu === id ? null : id);
    }
  };

  // Toggle tips visibility
  const toggleTips = (section: keyof typeof showTips) => {
    setShowTips(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white bg-opacity-5 rounded-lg shadow-lg">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-0 rounded-none rounded-t-lg">
          <TabsTrigger 
            value="personal" 
            className="flex items-center gap-1 py-3"
          >
            <User size={16} />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger 
            value="experience" 
            className="flex items-center gap-1 py-3"
          >
            <Briefcase size={16} />
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger 
            value="education" 
            className="flex items-center gap-1 py-3"
          >
            <GraduationCap size={16} />
            <span className="hidden sm:inline">Education</span>
          </TabsTrigger>
          <TabsTrigger 
            value="skills" 
            className="flex items-center gap-1 py-3"
          >
            <Wrench size={16} />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Personal Info Tab */}
        <TabsContent value="personal" className="px-6 py-5 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-resumify-beige">Personal Information</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => toggleTips('personal')}
              className="text-resumify-off-white"
            >
              {showTips.personal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
          
          <AnimatePresence>
            {showTips.personal && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-800/30 rounded-lg p-3 mb-5 text-sm text-resumify-off-white"
              >
                <div className="flex gap-2">
                  <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>
                      This section forms the header of your resume. Make sure your name stands out, 
                      and your contact information is current and professional.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Profile Photo Upload */}
          <div className="p-5 rounded-lg bg-gray-800/20 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="relative">
              <div className="w-28 h-28 bg-white bg-opacity-10 border-2 border-dashed border-resumify-beige/40 rounded-lg flex flex-col items-center justify-center overflow-hidden">
                {resumeData.personalInfo.photoUrl ? (
                  <>
                    <img 
                      src={resumeData.personalInfo.photoUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute bottom-2 right-2 h-7 w-7 rounded-full opacity-90"
                      onClick={removePhoto}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <Camera size={24} className="text-resumify-beige mb-2" />
                    <span className="text-xs text-resumify-off-white text-center px-2">Add Photo</span>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/jpg" 
                      className="hidden" 
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            
            <div className="flex-1 space-y-1">
              <h4 className="text-base font-medium text-resumify-beige">Profile Photo</h4>
              <p className="text-sm text-resumify-off-white mb-2">
                A professional headshot can make your resume more personable.
              </p>
              <ul className="text-xs text-resumify-off-white/80 space-y-1">
                <li className="flex items-start gap-1">
                  <span className="text-blue-400 text-lg leading-none">•</span>
                  Square aspect ratio recommended
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-400 text-lg leading-none">•</span>
                  Maximum size: 2MB
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-resumify-beige">Full Name</Label>
              <Input
                id="name"
                value={resumeData.personalInfo.name}
                onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
                placeholder="e.g., John Smith"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title" className="text-resumify-beige">Job Title</Label>
              <Input
                id="title"
                value={resumeData.personalInfo.title}
                onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
                placeholder="e.g., Software Engineer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-resumify-beige">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
                placeholder="e.g., john.smith@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-resumify-beige">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
                placeholder="e.g., +1 (555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-resumify-beige">Location</Label>
              <Input
                id="address"
                value={resumeData.personalInfo.address}
                onChange={(e) => updatePersonalInfo({ address: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
                placeholder="e.g., New York, NY"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-resumify-beige">LinkedIn (optional)</Label>
              <Input
                id="linkedin"
                value={resumeData.personalInfo.linkedin || ''}
                onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
                placeholder="e.g., linkedin.com/in/johnsmith"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website" className="text-resumify-beige">Website (optional)</Label>
              <Input
                id="website"
                value={resumeData.personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
                placeholder="e.g., johnsmith.com"
              />
            </div>
          </div>
          
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="summary" className="text-resumify-beige">Professional Summary</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleTips('summary')}
                className="text-resumify-off-white"
              >
                {showTips.summary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
            
            <AnimatePresence>
              {showTips.summary && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-800/30 rounded-lg p-3 text-sm text-resumify-off-white"
                >
                  <div className="flex gap-2">
                    <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>
                        Your summary should be a concise paragraph (3-5 sentences) highlighting your 
                        professional background, key skills, and career goals.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Textarea
              id="summary"
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="min-h-[120px] bg-white bg-opacity-10 border-opacity-20 text-white"
              placeholder="A brief overview of your professional background, key skills, and career goals."
            />
          </div>
        </TabsContent>
        
        {/* Work Experience Tab */}
        <TabsContent value="experience" className="px-6 py-5 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-resumify-beige">Work Experience</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleTips('experience')}
                className="text-resumify-off-white"
              >
                {showTips.experience ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => addWorkExperience({
                        company: '',
                        position: '',
                        location: '',
                        startDate: '',
                        endDate: '',
                        description: ''
                      })}
                      variant="default"
                      size="sm"
                      className="bg-resumify-brown hover:bg-resumify-brown-dark text-white"
                    >
                      <Plus size={16} className="mr-1" /> Add Experience
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add new work experience entry</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <AnimatePresence>
            {showTips.experience && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-800/30 rounded-lg p-3 mb-4 text-sm text-resumify-off-white"
              >
                <div className="flex gap-2">
                  <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>
                      List your work experience in reverse chronological order (most recent first). 
                      Focus on accomplishments rather than duties, and use action verbs.
                    </p>
                    <p className="mt-1">
                      Example: "Increased website traffic by 150% through implementation of SEO strategies"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="space-y-4">
            {resumeData.workExperience.length === 0 ? (
              <div className="text-center p-8 rounded-lg border border-dashed border-gray-600 bg-gray-800/20">
                <Briefcase size={32} className="mx-auto mb-2 text-gray-500" />
                <p className="text-gray-400">No work experience added yet</p>
                <p className="text-sm text-gray-500 mt-1">Click "Add Experience" to get started</p>
              </div>
            ) : (
              <Accordion 
                type="single" 
                collapsible 
                className="space-y-3"
              >
                {resumeData.workExperience.map((exp, index) => (
                  <AccordionItem 
                    key={exp.id} 
                    value={exp.id}
                    className="bg-gray-800/20 rounded-lg border-none overflow-hidden data-[state=open]:bg-gray-800/30"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex flex-col items-start text-left">
                        <div className="font-medium text-resumify-beige">
                          {exp.position || 'Position Title'}
                          {exp.company && <span className="text-gray-400"> • {exp.company}</span>}
                        </div>
                        <div className="text-sm text-gray-400 flex flex-wrap gap-x-2 items-center mt-1">
                          {exp.startDate && exp.endDate && (
                            <span>{exp.startDate} - {exp.endDate}</span>
                          )}
                          {exp.location && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span>{exp.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${exp.id}`} className="text-resumify-beige">Company</Label>
                          <Input
                            id={`company-${exp.id}`}
                            value={exp.company}
                            onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                            className="bg-white bg-opacity-10 border-opacity-20 text-white"
                            placeholder="e.g., Acme Corporation"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`position-${exp.id}`} className="text-resumify-beige">Position</Label>
                          <Input
                            id={`position-${exp.id}`}
                            value={exp.position}
                            onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                            className="bg-white bg-opacity-10 border-opacity-20 text-white"
                            placeholder="e.g., Senior Developer"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`location-${exp.id}`} className="text-resumify-beige">Location (optional)</Label>
                          <Input
                            id={`location-${exp.id}`}
                            value={exp.location || ''}
                            onChange={(e) => updateWorkExperience(exp.id, { location: e.target.value })}
                            className="bg-white bg-opacity-10 border-opacity-20 text-white"
                            placeholder="e.g., San Francisco, CA"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`start-date-${exp.id}`} className="text-resumify-beige">Start Date</Label>
                            <Input
                              id={`start-date-${exp.id}`}
                              value={exp.startDate}
                              onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                              className="bg-white bg-opacity-10 border-opacity-20 text-white"
                              placeholder="e.g., 2020"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`end-date-${exp.id}`} className="text-resumify-beige">End Date</Label>
                            <Input
                              id={`end-date-${exp.id}`}
                              value={exp.endDate}
                              onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                              className="bg-white bg-opacity-10 border-opacity-20 text-white"
                              placeholder="e.g., Present"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`description-${exp.id}`} className="text-resumify-beige">Description</Label>
                        <Textarea
                          id={`description-${exp.id}`}
                          value={exp.description}
                          onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                          className="min-h-[100px] bg-white bg-opacity-10 border-opacity-20 text-white"
                          placeholder="Describe your responsibilities and achievements. Use bullet points by starting lines with • or -"
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button
                          onClick={() => removeWorkExperience(exp.id)}
                          variant="destructive"
                          size="sm"
                          className="text-white"
                        >
                          <Trash2 size={16} className="mr-2" /> Remove
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </TabsContent>
        
        {/* Education Tab */}
        <TabsContent value="education" className="px-6 py-5 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-resumify-beige">Education</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleTips('education')}
                className="text-resumify-off-white"
              >
                {showTips.education ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => addEducation({
                        institution: '',
                        degree: '',
                        fieldOfStudy: '',
                        startDate: '',
                        endDate: '',
                        description: ''
                      })}
                      variant="default"
                      size="sm"
                      className="bg-resumify-brown hover:bg-resumify-brown-dark text-white"
                    >
                      <Plus size={16} className="mr-1" /> Add Education
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add new education entry</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <AnimatePresence>
            {showTips.education && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-800/30 rounded-lg p-3 mb-4 text-sm text-resumify-off-white"
              >
                <div className="flex gap-2">
                  <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>
                      Include your highest level of education first. Mention relevant coursework, 
                      achievements, or extracurricular activities that relate to your target position.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="space-y-4">
            {resumeData.education.length === 0 ? (
              <div className="text-center p-8 rounded-lg border border-dashed border-gray-600 bg-gray-800/20">
                <GraduationCap size={32} className="mx-auto mb-2 text-gray-500" />
                <p className="text-gray-400">No education added yet</p>
                <p className="text-sm text-gray-500 mt-1">Click "Add Education" to get started</p>
              </div>
            ) : (
              <Accordion 
                type="single" 
                collapsible 
                className="space-y-3"
              >
                {resumeData.education.map((edu) => (
                  <AccordionItem 
                    key={edu.id} 
                    value={edu.id}
                    className="bg-gray-800/20 rounded-lg border-none overflow-hidden data-[state=open]:bg-gray-800/30"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex flex-col items-start text-left">
                        <div className="font-medium text-resumify-beige">
                          {edu.degree || 'Degree Title'}
                          {edu.institution && <span className="text-gray-400"> • {edu.institution}</span>}
                        </div>
                        <div className="text-sm text-gray-400 flex flex-wrap gap-x-2 items-center mt-1">
                          {edu.startDate && edu.endDate && (
                            <span>{edu.startDate} - {edu.endDate}</span>
                          )}
                          {edu.fieldOfStudy && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span>{edu.fieldOfStudy}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor={`institution-${edu.id}`} className="text-resumify-beige">Institution</Label>
                          <Input
                            id={`institution-${edu.id}`}
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                            className="bg-white bg-opacity-10 border-opacity-20 text-white"
                            placeholder="e.g., University of California"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${edu.id}`} className="text-resumify-beige">Degree</Label>
                          <Input
                            id={`degree-${edu.id}`}
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                            className="bg-white bg-opacity-10 border-opacity-20 text-white"
                            placeholder="e.g., Bachelor of Science"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`field-${edu.id}`} className="text-resumify-beige">Field of Study</Label>
                          <Input
                            id={`field-${edu.id}`}
                            value={edu.fieldOfStudy || ''}
                            onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                            className="bg-white bg-opacity-10 border-opacity-20 text-white"
                            placeholder="e.g., Computer Science"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`start-date-${edu.id}`} className="text-resumify-beige">Start Date</Label>
                            <Input
                              id={`start-date-${edu.id}`}
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                              className="bg-white bg-opacity-10 border-opacity-20 text-white"
                              placeholder="e.g., 2014"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`end-date-${edu.id}`} className="text-resumify-beige">End Date</Label>
                            <Input
                              id={`end-date-${edu.id}`}
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                              className="bg-white bg-opacity-10 border-opacity-20 text-white"
                              placeholder="e.g., 2018"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`description-${edu.id}`} className="text-resumify-beige">Description (optional)</Label>
                        <Textarea
                          id={`description-${edu.id}`}
                          value={edu.description || ''}
                          onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                          className="min-h-[100px] bg-white bg-opacity-10 border-opacity-20 text-white"
                          placeholder="Add relevant coursework, achievements, or activities (optional)"
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button
                          onClick={() => removeEducation(edu.id)}
                          variant="destructive"
                          size="sm"
                          className="text-white"
                        >
                          <Trash2 size={16} className="mr-2" /> Remove
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="px-6 py-5 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-resumify-beige">Skills</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleTips('skills')}
                className="text-resumify-off-white"
              >
                {showTips.skills ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => addSkill({ name: '', level: 3 })}
                      variant="default"
                      size="sm"
                      className="bg-resumify-brown hover:bg-resumify-brown-dark text-white"
                    >
                      <Plus size={16} className="mr-1" /> Add Skill
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add new skill</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <AnimatePresence>
            {showTips.skills && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-800/30 rounded-lg p-3 mb-4 text-sm text-resumify-off-white"
              >
                <div className="flex gap-2">
                  <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>
                      List skills that are relevant to the position you're applying for. 
                      Include both technical skills and soft skills that make you stand out.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="space-y-4">
            {resumeData.skills.length === 0 ? (
              <div className="text-center p-8 rounded-lg border border-dashed border-gray-600 bg-gray-800/20">
                <Wrench size={32} className="mx-auto mb-2 text-gray-500" />
                <p className="text-gray-400">No skills added yet</p>
                <p className="text-sm text-gray-500 mt-1">Click "Add Skill" to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {resumeData.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="group bg-gray-800/20 p-3 rounded-lg hover:bg-gray-800/30 transition-colors flex items-center justify-between"
                  >
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                      placeholder="Enter skill"
                      className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-white"
                    />
                    <Button
                      onClick={() => removeSkill(skill.id)}
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeEditor;
