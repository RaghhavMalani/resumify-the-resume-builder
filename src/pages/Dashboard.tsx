
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getResumesByUser, deleteResume, Resume } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { PlusCircle, FileEdit, Trash2, Clock, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    // Redirect if user is not logged in
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchUserResumes();
    }
  }, [user, authLoading, navigate]);

  const fetchUserResumes = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userResumes = await getResumesByUser(user._id);
      setResumes(userResumes);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
      toast.error('Failed to load your resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!deleteId) return;
    
    try {
      await deleteResume(deleteId);
      setResumes(resumes.filter(resume => resume._id !== deleteId));
      toast.success('Resume deleted successfully');
    } catch (error) {
      console.error('Failed to delete resume:', error);
      toast.error('Failed to delete resume');
    } finally {
      setDeleteId(null);
      setIsDeleteOpen(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
        ) : resumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map(resume => (
              <Card key={resume._id?.toString()} className="bg-gray-800 border-gray-700 overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-resumify-beige">{resume.title}</CardTitle>
                  <CardDescription className="text-resumify-off-white flex items-center gap-1">
                    <Clock size={14} /> 
                    {resume.updatedAt 
                      ? `Updated ${format(new Date(resume.updatedAt), 'MMM d, yyyy')}`
                      : `Created ${format(new Date(resume.createdAt), 'MMM d, yyyy')}`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-gray-700 rounded flex items-center justify-center">
                    <p className="text-sm text-resumify-off-white">
                      Template: {resume.templateId}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-resumify-off-white border-gray-700 hover:bg-gray-700"
                      onClick={() => navigate(`/editor/${resume.templateId}`, { state: { resumeId: resume._id } })}
                    >
                      <FileEdit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-resumify-off-white border-gray-700 hover:bg-gray-700"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-resumify-off-white border-gray-700 hover:bg-gray-700"
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="bg-red-900 hover:bg-red-800"
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
        ) : (
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
        )}
      </div>
      
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
    </div>
  );
};

export default Dashboard;
