
import { ObjectId } from 'mongodb';
import { getCollection } from '../lib/mongodb';

export interface Resume {
  _id?: string | ObjectId;
  userId: string;
  title: string;
  templateId: string;
  content: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id?: string | ObjectId;
  email: string;
  name: string;
  createdAt: Date;
  password?: string; // Only used during creation, never returned
}

// Helper function to convert string ID to ObjectId
function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

// Auth related functions
export async function registerUser(name: string, email: string, password: string) {
  const usersCollection = await getCollection('users');
  
  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // In a real app, you would hash the password here
  const hashedPassword = password; // This should be hashed in production!
  
  const newUser = {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date()
  };
  
  const result = await usersCollection.insertOne(newUser);
  
  // Don't return the password
  const { password: _, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword, _id: result.insertedId };
}

export async function loginUser(email: string, password: string) {
  const usersCollection = await getCollection('users');
  
  const user = await usersCollection.findOne({ email });
  if (!user) {
    throw new Error('No user found with this email');
  }
  
  // In a real app, you would compare hashed passwords
  if (user.password !== password) {
    throw new Error('Invalid password');
  }
  
  // Don't return the password
  const { password: _, ...userWithoutPassword } = user;
  
  // In a real app, you would generate a JWT token here
  const token = 'mock-token';
  
  return { user: userWithoutPassword, token };
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
    { _id: toObjectId(id) },
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
  return resumesCollection.findOne({ _id: toObjectId(id) });
}

export async function deleteResume(id: string) {
  const resumesCollection = await getCollection('resumes');
  const result = await resumesCollection.deleteOne({ _id: toObjectId(id) });
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
  return usersCollection.findOne({ _id: toObjectId(id) });
}

export async function updateUser(id: string, updates: Partial<Omit<User, '_id' | 'createdAt' | 'password'>>) {
  const usersCollection = await getCollection('users');
  
  const result = await usersCollection.updateOne(
    { _id: toObjectId(id) },
    { $set: updates }
  );
  
  return result.modifiedCount > 0;
}
