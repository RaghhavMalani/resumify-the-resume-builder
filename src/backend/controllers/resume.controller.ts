
import { v4 as uuidv4 } from 'uuid';
import { getCollection, toObjectId } from '../db/connection';
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
    
    // Use MongoDB ObjectId
    const newResume: Resume = {
      ...resumeData,
      _id: new ObjectId(),
      userId: resumeData.userId,
      createdAt: now,
      updatedAt: now
    };
    
    // Insert document without _id to let MongoDB generate it
    const { _id, ...resumeWithoutId } = newResume;
    const result = await resumeCollection.insertOne(resumeWithoutId);
    
    // Update the resume object with the generated _id
    newResume._id = result.insertedId;
    
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

export async function updateResume(id: string | ObjectId, updates: Partial<Omit<Resume, '_id' | 'createdAt'>>): Promise<ServerResponse<boolean>> {
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
      { _id: toObjectId(id) },
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

export async function getResumeById(id: string | ObjectId): Promise<ServerResponse<Resume>> {
  try {
    if (!id) {
      return {
        success: false,
        error: 'Resume ID is required'
      };
    }

    const resumeCollection = await getCollection('resumes');
    const resume = await resumeCollection.findOne({ _id: toObjectId(id) });
    
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

export async function getResumesByUser(userId: string | ObjectId): Promise<ServerResponse<Resume[]>> {
  try {
    if (!userId) {
      return {
        success: false,
        error: 'User ID is required'
      };
    }

    const resumeCollection = await getCollection('resumes');
    const resumes = await resumeCollection.find({ userId: toObjectId(userId) }).toArray();
    
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

export async function deleteResume(id: string | ObjectId): Promise<ServerResponse<boolean>> {
  try {
    if (!id) {
      return {
        success: false,
        error: 'Resume ID is required'
      };
    }

    const resumeCollection = await getCollection('resumes');
    const result = await resumeCollection.deleteOne({ _id: toObjectId(id) });
    
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
