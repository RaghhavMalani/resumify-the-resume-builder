
import { v4 as uuidv4 } from 'uuid';
import { getCollection } from '../db/connection';
import { Resume, ServerResponse } from '../models/types';
import { ObjectId } from 'mongodb';

export async function createResume(resumeData: Omit<Resume, '_id' | 'createdAt' | 'updatedAt'>): Promise<ServerResponse<Resume>> {
  try {
    if (!resumeData.userId || !resumeData.templateId) {
      return {
        success: false,
        error: 'User ID and template ID are required'
      };
    }

    const resumeCollection = await getCollection('resumes');
    const now = new Date();
    
    const newResume: Resume = {
      ...resumeData,
      _id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    
    await resumeCollection.insertOne(newResume);
    
    return {
      success: true,
      data: newResume,
      message: 'Resume created successfully'
    };
  } catch (error) {
    console.error('Create resume error:', error);
    return {
      success: false,
      error: 'An error occurred while creating resume'
    };
  }
}

export async function updateResume(id: string, updates: Partial<Omit<Resume, '_id' | 'createdAt'>>): Promise<ServerResponse<boolean>> {
  try {
    if (!id) {
      return {
        success: false,
        error: 'Resume ID is required'
      };
    }

    const resumeCollection = await getCollection('resumes');
    
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    const result = await resumeCollection.updateOne(
      { _id: id },
      { $set: updateData }
    );
    
    if (result.modifiedCount === 0) {
      return {
        success: false,
        error: 'Resume not found or no changes made'
      };
    }
    
    return {
      success: true,
      data: true,
      message: 'Resume updated successfully'
    };
  } catch (error) {
    console.error('Update resume error:', error);
    return {
      success: false,
      error: 'An error occurred while updating resume'
    };
  }
}

export async function getResumeById(id: string): Promise<ServerResponse<Resume>> {
  try {
    if (!id) {
      return {
        success: false,
        error: 'Resume ID is required'
      };
    }

    const resumeCollection = await getCollection('resumes');
    const resume = await resumeCollection.findOne({ _id: id });
    
    if (!resume) {
      return {
        success: false,
        error: 'Resume not found'
      };
    }
    
    return {
      success: true,
      data: resume as unknown as Resume
    };
  } catch (error) {
    console.error('Get resume error:', error);
    return {
      success: false,
      error: 'An error occurred while fetching resume'
    };
  }
}

export async function getResumesByUser(userId: string): Promise<ServerResponse<Resume[]>> {
  try {
    if (!userId) {
      return {
        success: false,
        error: 'User ID is required'
      };
    }

    const resumeCollection = await getCollection('resumes');
    const resumes = await resumeCollection.find({ userId }).toArray();
    
    return {
      success: true,
      data: resumes as unknown as Resume[]
    };
  } catch (error) {
    console.error('Get resumes error:', error);
    return {
      success: false,
      error: 'An error occurred while fetching resumes'
    };
  }
}

export async function deleteResume(id: string): Promise<ServerResponse<boolean>> {
  try {
    if (!id) {
      return {
        success: false,
        error: 'Resume ID is required'
      };
    }

    const resumeCollection = await getCollection('resumes');
    const result = await resumeCollection.deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return {
        success: false,
        error: 'Resume not found or already deleted'
      };
    }
    
    return {
      success: true,
      data: true,
      message: 'Resume deleted successfully'
    };
  } catch (error) {
    console.error('Delete resume error:', error);
    return {
      success: false,
      error: 'An error occurred while deleting resume'
    };
  }
}
