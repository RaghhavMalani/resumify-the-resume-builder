
// Mock data for our frontend application
// In a real application, these would be API calls to a backend server

import { v4 as uuidv4 } from 'uuid';

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
  password?: string; // Only used during creation, never returned
}

// Mock storage using localStorage
const getLocalStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setLocalStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Auth related functions
export async function registerUser(name: string, email: string, password: string) {
  // Check if user already exists
  const users = getLocalStorage<User>('users');
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // In a real app, you would hash the password
  const newUser: User = {
    _id: uuidv4(),
    name,
    email,
    password, // This should be hashed in production!
    createdAt: new Date()
  };
  
  // Save the user
  users.push(newUser);
  setLocalStorage<User>('users', users);
  
  // Don't return the password
  const { password: _, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword };
}

export async function loginUser(email: string, password: string) {
  const users = getLocalStorage<User>('users');
  const user = users.find(u => u.email === email);
  
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
  const token = uuidv4();
  
  // Store the token in localStorage for subsequent API calls
  localStorage.setItem('resumify-token', token);
  localStorage.setItem('resumify-user', JSON.stringify(userWithoutPassword));
  
  return { user: userWithoutPassword, token };
}

// Resume related functions
export async function saveResume(resume: Omit<Resume, '_id' | 'createdAt' | 'updatedAt'>) {
  const resumes = getLocalStorage<Resume>('resumes');
  const now = new Date();
  
  const newResume: Resume = {
    ...resume,
    _id: uuidv4(),
    createdAt: now,
    updatedAt: now
  };
  
  resumes.push(newResume);
  setLocalStorage<Resume>('resumes', resumes);
  
  return newResume;
}

export async function updateResume(id: string, updates: Partial<Omit<Resume, '_id' | 'createdAt'>>) {
  const resumes = getLocalStorage<Resume>('resumes');
  const resumeIndex = resumes.findIndex(r => r._id === id);
  
  if (resumeIndex === -1) {
    return false;
  }
  
  resumes[resumeIndex] = {
    ...resumes[resumeIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  setLocalStorage<Resume>('resumes', resumes);
  return true;
}

export async function getResumesByUser(userId: string): Promise<Resume[]> {
  const resumes = getLocalStorage<Resume>('resumes');
  return resumes.filter(r => r.userId === userId);
}

export async function getResumeById(id: string): Promise<Resume | null> {
  const resumes = getLocalStorage<Resume>('resumes');
  const resume = resumes.find(r => r._id === id);
  return resume || null;
}

export async function deleteResume(id: string): Promise<boolean> {
  const resumes = getLocalStorage<Resume>('resumes');
  const newResumes = resumes.filter(r => r._id !== id);
  
  if (newResumes.length === resumes.length) {
    return false;
  }
  
  setLocalStorage<Resume>('resumes', newResumes);
  return true;
}

// User related functions
export async function createUser(user: Omit<User, '_id' | 'createdAt'>) {
  const users = getLocalStorage<User>('users');
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
    return existingUser;
  }
  
  const newUser: User = {
    ...user,
    _id: uuidv4(),
    createdAt: new Date()
  };
  
  users.push(newUser);
  setLocalStorage<User>('users', users);
  
  return newUser;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = getLocalStorage<User>('users');
  const user = users.find(u => u.email === email);
  return user || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = getLocalStorage<User>('users');
  const user = users.find(u => u._id === id);
  return user || null;
}

export async function updateUser(id: string, updates: Partial<Omit<User, '_id' | 'createdAt' | 'password'>>): Promise<boolean> {
  const users = getLocalStorage<User>('users');
  const userIndex = users.findIndex(u => u._id === id);
  
  if (userIndex === -1) {
    return false;
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updates
  };
  
  setLocalStorage<User>('users', users);
  return true;
}

// Helper for checking authentication
export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem('resumify-user');
  return userJson ? JSON.parse(userJson) : null;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('resumify-token');
}

export function logout(): void {
  localStorage.removeItem('resumify-token');
  localStorage.removeItem('resumify-user');
}
