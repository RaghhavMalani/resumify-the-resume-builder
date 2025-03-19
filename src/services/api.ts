
import { getCollection } from '../lib/mongodb';

export interface Resume {
  _id?: string;
  userId: string;
  title: string;
  templateId: string;
  content: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Resume related functions
export async function saveResume(resume: Omit<Resume, '_id' | 'createdAt' | 'updatedAt'>) {
  const resumesCollection = await getCollection('resumes');
  const now = new Date();
  
  const newResume = {
    ...resume,
    createdAt: now,
    updatedAt: now
  };
  
  const result = await resumesCollection.insertOne(newResume);
  return { ...newResume, _id: result.insertedId };
}

export async function updateResume(id: string, updates: Partial<Omit<Resume, '_id' | 'createdAt'>>) {
  const resumesCollection = await getCollection('resumes');
  
  const result = await resumesCollection.updateOne(
    { _id: id },
    { 
      $set: {
        ...updates,
        updatedAt: new Date()
      } 
    }
  );
  
  return result.modifiedCount > 0;
}

export async function getResumesByUser(userId: string) {
  const resumesCollection = await getCollection('resumes');
  return resumesCollection.find({ userId }).toArray();
}

export async function getResumeById(id: string) {
  const resumesCollection = await getCollection('resumes');
  return resumesCollection.findOne({ _id: id });
}

export async function deleteResume(id: string) {
  const resumesCollection = await getCollection('resumes');
  const result = await resumesCollection.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

// User related functions
export async function createUser(user: Omit<User, '_id' | 'createdAt'>) {
  const usersCollection = await getCollection('users');
  
  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email: user.email });
  if (existingUser) {
    return existingUser;
  }
  
  const newUser = {
    ...user,
    createdAt: new Date()
  };
  
  const result = await usersCollection.insertOne(newUser);
  return { ...newUser, _id: result.insertedId };
}

export async function getUserByEmail(email: string) {
  const usersCollection = await getCollection('users');
  return usersCollection.findOne({ email });
}

export async function getUserById(id: string) {
  const usersCollection = await getCollection('users');
  return usersCollection.findOne({ _id: id });
}
