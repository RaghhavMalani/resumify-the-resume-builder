
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BackendService } from '../services/BackendService';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  PlusCircle,
  FileEdit,
  Trash2,
  Clock,
  Download,
  Eye,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Edit3,
  Copy,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { Resume, deleteResume } from '../services/api';

const MyResumes: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'favorites'>('all');
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [resumeToDuplicate, setResumeToDuplicate] = useState<Resume | null>(null);
  const [newTitle, setNewTitle] = useState('');

  // Fetch user's resumes
  const { data: resumes, isLoading, isError, refetch } = useQuery({
    queryKey: ['userResumes'],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return await BackendService.getUserResumes();
    },
    enabled: !!user,
  });

  useEffect(() => {
    // Redirect if user is not logged in
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleDeleteResume = async () => {
    if (!deleteId) return;
    
    try {
      await deleteResume(deleteId);
      toast.success('Resume deleted successfully');
      refetch(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete resume:', error);
      toast.error('Failed to delete resume');
    } finally {
      setDeleteId(null);
      setIsDeleteOpen(false);
    }
  };

  const handleDuplicateResume = async () => {
    if (!resumeToDuplicate || !newTitle.trim()) return;
    
    try {
      const title = newTitle.trim() || `Copy of ${resumeToDuplicate.title}`;
      await BackendService.createResume(
        resumeToDuplicate.templateId,
        title, 
        resumeToDuplicate.content
      );
      
      toast.success('Resume duplicated successfully');
      refetch(); // Refresh the list
      setDuplicateDialogOpen(false);
      setResumeToDuplicate(null);
      setNewTitle('');
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
      toast.error('Failed to duplicate resume');
    }
  };

  // Filter resumes based on active tab
  const filteredResumes = resumes ? resumes.filter(resume => {
    if (activeTab === 'all') return true;
    if (activeTab === 'recent') {
      // Show resumes from the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(resume.updatedAt) >= sevenDaysAgo;
    }
    if (activeTab === 'favorites') {
      // In a real app, you would have a favorites field
      // For now, we'll just show a subset
      return resumes.indexOf(resume) % 3 === 0;
    }
    return true;
  }) : [];

  // Check if we should show the empty state
  const showEmptyState = !isLoading && (!resumes || resumes.length === 0);
  const showFilteredEmptyState = !isLoading && resumes && resumes.length > 0 && filteredResumes.length === 0;
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-resumify-brown"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-resumify-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-resumify-beige">My Resumes</h1>
            <p className="text-resumify-off-white mt-2">
              Manage all your resume creations in one place.
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/hiring-templates')}
            className="bg-resumify-brown hover:bg-resumify-brown-dark text-white flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Create New Resume
          </Button>
        </div>
        
        {/* Tabs for filtering */}
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as any)}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-resumify-brown">All Resumes</TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-resumify-brown">Recent</TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-resumify-brown">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
                <CardHeader className="pb-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-gray-700 rounded"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-700 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-medium text-resumify-beige mb-2">Error Loading Resumes</h3>
            <p className="text-resumify-off-white max-w-md mx-auto mb-6">
              We encountered an error while loading your resumes. Please try again.
            </p>
            <Button 
              onClick={() => refetch()}
              className="bg-resumify-brown hover:bg-resumify-brown-dark text-white"
            >
              Try Again
            </Button>
          </div>
        ) : showEmptyState ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
            <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FileEdit size={24} className="text-resumify-off-white" />
            </div>
            <h3 className="text-xl font-medium text-resumify-beige mb-2">No Resumes Created Yet</h3>
            <p className="text-resumify-off-white max-w-md mx-auto mb-6">
              Get started by creating your first professional resume using our templates.
            </p>
            <Button 
              onClick={() => navigate('/hiring-templates')}
              className="bg-resumify-brown hover:bg-resumify-brown-dark text-white"
            >
              Create Your First Resume
            </Button>
          </div>
        ) : showFilteredEmptyState ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
            <FileText size={48} className="mx-auto text-resumify-off-white/50 mb-4" />
            <h3 className="text-xl font-medium text-resumify-beige mb-2">No Matching Resumes</h3>
            <p className="text-resumify-off-white max-w-md mx-auto mb-6">
              {activeTab === 'recent' 
                ? "You don't have any resumes created or updated in the last 7 days." 
                : activeTab === 'favorites' 
                  ? "You don't have any favorite resumes yet."
                  : "No resumes match your current filter."}
            </p>
            <Button 
              onClick={() => setActiveTab('all')}
              variant="outline"
              className="bg-transparent text-resumify-beige border-resumify-beige hover:bg-resumify-beige/10"
            >
              View All Resumes
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResumes.map(resume => (
                <Card key={resume._id?.toString()} className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-resumify-brown/50 transition-colors">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-resumify-beige group-hover:text-resumify-beige/90">{resume.title}</CardTitle>
                    <CardDescription className="text-resumify-off-white flex items-center gap-1">
                      <Clock size={14} /> 
                      {resume.updatedAt 
                        ? `Updated ${format(new Date(resume.updatedAt), 'MMM d, yyyy')}`
                        : `Created ${format(new Date(resume.createdAt), 'MMM d, yyyy')}`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 bg-gray-700 rounded flex items-center justify-center group-hover:bg-gray-700/80 transition-colors">
                      <div className="flex flex-col items-center">
                        <p className="text-sm text-resumify-off-white mb-1">
                          Template: {resume.templateId}
                        </p>
                        <div className="flex items-center text-xs text-resumify-off-white/70">
                          <CheckCircle size={12} className="mr-1 text-green-500" />
                          Ready to download
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-resumify-off-white border-gray-700 hover:bg-gray-700"
                        onClick={() => navigate(`/editor/${resume.templateId}`, { state: { resumeId: resume._id } })}
                        title="Edit Resume"
                      >
                        <Edit3 size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-resumify-off-white border-gray-700 hover:bg-gray-700"
                        title="Preview Resume"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-resumify-off-white border-gray-700 hover:bg-gray-700"
                        title="Download Resume"
                      >
                        <Download size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-resumify-off-white border-gray-700 hover:bg-gray-700"
                        title="Duplicate Resume"
                        onClick={() => {
                          setResumeToDuplicate(resume);
                          setNewTitle(`Copy of ${resume.title}`);
                          setDuplicateDialogOpen(true);
                        }}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="bg-red-900 hover:bg-red-800"
                      title="Delete Resume"
                      onClick={() => {
                        setDeleteId(resume._id?.toString() || null);
                        setIsDeleteOpen(true);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredResumes.length > 0 && (
              <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between">
                <div className="text-resumify-off-white">
                  <p className="font-medium text-resumify-beige">Resume Management Tips</p>
                  <p className="text-sm">Keep your resumes organized by updating regularly and deleting outdated versions.</p>
                </div>
                <Button
                  onClick={() => navigate('/hiring-templates')}
                  variant="outline"
                  className="border-resumify-beige text-resumify-beige hover:bg-resumify-beige/10"
                >
                  Create New Resume
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-resumify-white">
          <DialogHeader>
            <DialogTitle className="text-resumify-beige">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-resumify-off-white">
              Are you sure you want to delete this resume? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button 
              variant="ghost" 
              onClick={() => setIsDeleteOpen(false)}
              className="text-resumify-off-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteResume}
              className="bg-red-900 hover:bg-red-800"
            >
              Delete Resume
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Duplicate Resume Dialog */}
      <Dialog open={duplicateDialogOpen} onOpenChange={setDuplicateDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-resumify-white">
          <DialogHeader>
            <DialogTitle className="text-resumify-beige">Duplicate Resume</DialogTitle>
            <DialogDescription className="text-resumify-off-white">
              Create a copy of this resume with a new title.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <label className="text-sm text-resumify-off-white mb-2 block">
              New Resume Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Enter a title for the new resume"
            />
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="ghost" 
              onClick={() => {
                setDuplicateDialogOpen(false);
                setResumeToDuplicate(null);
              }}
              className="text-resumify-off-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              variant="default"
              onClick={handleDuplicateResume}
              disabled={!newTitle.trim()}
              className="bg-resumify-brown hover:bg-resumify-brown-dark"
            >
              Duplicate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Decorative triangles */}
      <div className="triangle triangle-3"></div>
    </div>
  );
};

export default MyResumes;
