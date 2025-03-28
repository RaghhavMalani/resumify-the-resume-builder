
import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Plus, Trash2, Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';

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

  return (
    <div className="bg-white bg-opacity-5 rounded-lg p-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4">
          <h3 className="text-xl font-semibold text-resumify-beige mb-4">Personal Information</h3>
          
          {/* Profile Photo Upload */}
          <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="w-32 h-32 bg-white bg-opacity-10 border-2 border-dashed border-resumify-beige/40 rounded-lg flex flex-col items-center justify-center overflow-hidden relative">
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
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full opacity-90"
                    onClick={removePhoto}
                  >
                    <Trash2 size={14} />
                  </Button>
                </>
              ) : (
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                  <Camera size={24} className="text-resumify-beige mb-2" />
                  <span className="text-sm text-resumify-off-white text-center px-2">Add Photo</span>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg" 
                    className="hidden" 
                    onChange={handlePhotoUpload}
                  />
                </label>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <h4 className="text-lg font-medium text-resumify-beige">Profile Photo</h4>
              <p className="text-sm text-resumify-off-white">
                Add a professional photo to make your resume stand out. 
                A headshot with a neutral background works best.
              </p>
              <ul className="text-xs text-resumify-off-white/80 list-disc pl-5 space-y-1">
                <li>Square aspect ratio recommended</li>
                <li>Maximum size: 2MB</li>
                <li>Formats: JPG, PNG</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={resumeData.personalInfo.name}
                onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={resumeData.personalInfo.title}
                onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={resumeData.personalInfo.address}
                onChange={(e) => updatePersonalInfo({ address: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (optional)</Label>
              <Input
                id="linkedin"
                value={resumeData.personalInfo.linkedin || ''}
                onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input
                id="website"
                value={resumeData.personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                className="bg-white bg-opacity-10 border-opacity-20 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2 mt-6">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="min-h-[120px] bg-white bg-opacity-10 border-opacity-20 text-white"
            />
          </div>
        </TabsContent>
        
        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-resumify-beige">Education</h3>
            <Button
              onClick={() => addEducation({
                institution: '',
                degree: '',
                fieldOfStudy: '',
                startDate: '',
                endDate: '',
                description: ''
              })}
              variant="outline"
              size="sm"
              className="text-resumify-beige border-resumify-beige hover:bg-resumify-beige hover:text-resumify-background"
            >
              <Plus size={16} className="mr-2" /> Add Education
            </Button>
          </div>
          
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="bg-white bg-opacity-5 p-4 rounded-md space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    className="bg-white bg-opacity-10 border-opacity-20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    className="bg-white bg-opacity-10 border-opacity-20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`field-${edu.id}`}>Field of Study (optional)</Label>
                  <Input
                    id={`field-${edu.id}`}
                    value={edu.fieldOfStudy || ''}
                    onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                    className="bg-white bg-opacity-10 border-opacity-20 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${edu.id}`}>Start Year</Label>
                    <Input
                      id={`start-date-${edu.id}`}
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      className="bg-white bg-opacity-10 border-opacity-20 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${edu.id}`}>End Year</Label>
                    <Input
                      id={`end-date-${edu.id}`}
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      className="bg-white bg-opacity-10 border-opacity-20 text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${edu.id}`}>Description (optional)</Label>
                <Textarea
                  id={`description-${edu.id}`}
                  value={edu.description || ''}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                  className="bg-white bg-opacity-10 border-opacity-20 text-white"
                />
              </div>
              
              <Button
                onClick={() => removeEducation(edu.id)}
                variant="destructive"
                size="sm"
                className="mt-2"
              >
                <Trash2 size={16} className="mr-2" /> Remove
              </Button>
            </div>
          ))}
          
          {resumeData.education.length === 0 && (
            <div className="text-center py-8 text-resumify-off-white">
              No education added yet. Click the button above to add your education.
            </div>
          )}
        </TabsContent>
        
        {/* Work Experience Tab */}
        <TabsContent value="experience" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-resumify-beige">Work Experience</h3>
            <Button
              onClick={() => addWorkExperience({
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                description: ''
              })}
              variant="outline"
              size="sm"
              className="text-resumify-beige border-resumify-beige hover:bg-resumify-beige hover:text-resumify-background"
            >
              <Plus size={16} className="mr-2" /> Add Experience
            </Button>
          </div>
          
          {resumeData.workExperience.map((exp) => (
            <div key={exp.id} className="bg-white bg-opacity-5 p-4 rounded-md space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                    className="bg-white bg-opacity-10 border-opacity-20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`position-${exp.id}`}>Position</Label>
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                    className="bg-white bg-opacity-10 border-opacity-20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`location-${exp.id}`}>Location (optional)</Label>
                  <Input
                    id={`location-${exp.id}`}
                    value={exp.location || ''}
                    onChange={(e) => updateWorkExperience(exp.id, { location: e.target.value })}
                    className="bg-white bg-opacity-10 border-opacity-20 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${exp.id}`}>Start Year</Label>
                    <Input
                      id={`start-date-${exp.id}`}
                      value={exp.startDate}
                      onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                      className="bg-white bg-opacity-10 border-opacity-20 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${exp.id}`}>End Year</Label>
                    <Input
                      id={`end-date-${exp.id}`}
                      value={exp.endDate}
                      onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                      className="bg-white bg-opacity-10 border-opacity-20 text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${exp.id}`}>Description</Label>
                <Textarea
                  id={`description-${exp.id}`}
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                  className="min-h-[100px] bg-white bg-opacity-10 border-opacity-20 text-white"
                />
              </div>
              
              <Button
                onClick={() => removeWorkExperience(exp.id)}
                variant="destructive"
                size="sm"
                className="mt-2"
              >
                <Trash2 size={16} className="mr-2" /> Remove
              </Button>
            </div>
          ))}
          
          {resumeData.workExperience.length === 0 && (
            <div className="text-center py-8 text-resumify-off-white">
              No work experience added yet. Click the button above to add your experience.
            </div>
          )}
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-resumify-beige">Skills</h3>
            <Button
              onClick={() => addSkill({ name: '', level: 3 })}
              variant="outline"
              size="sm"
              className="text-resumify-beige border-resumify-beige hover:bg-resumify-beige hover:text-resumify-background"
            >
              <Plus size={16} className="mr-2" /> Add Skill
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {resumeData.skills.map((skill) => (
              <div 
                key={skill.id} 
                className="flex gap-2 items-center bg-white bg-opacity-5 p-3 rounded-md"
              >
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  placeholder="Skill name"
                  className="bg-white bg-opacity-10 border-opacity-20 text-white"
                />
                <Button
                  onClick={() => removeSkill(skill.id)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-500 hover:bg-opacity-10"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
          
          {resumeData.skills.length === 0 && (
            <div className="text-center py-8 text-resumify-off-white">
              No skills added yet. Click the button above to add your skills.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeEditor;
