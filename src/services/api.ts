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

// Improved local storage handling with better error handling
const getLocalStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error retrieving data from localStorage (${key}):`, error);
    return [];
  }
};

const setLocalStorage = <T>(key: string, data: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
    return false;
  }
};

// Initialize default data if not present
const initializeData = () => {
  if (!localStorage.getItem('users')) {
    setLocalStorage<User>('users', []);
  }
  
  if (!localStorage.getItem('resumes')) {
    setLocalStorage<Resume>('resumes', []);
  }
};

// Call initialization
initializeData();

// Auth related functions
export async function registerUser(name: string, email: string, password: string) {
  // Input validation
  if (!name || !email || !password) {
    throw new Error('Name, email and password are required');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
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
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

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
  if (!resume.userId || !resume.templateId) {
    throw new Error('User ID and template ID are required');
  }

  const resumes = getLocalStorage<Resume>('resumes');
  const now = new Date();
  
  const newResume: Resume = {
    ...resume,
    _id: uuidv4(),
    createdAt: now,
    updatedAt: now
  };
  
  resumes.push(newResume);
  const success = setLocalStorage<Resume>('resumes', resumes);
  
  if (!success) {
    throw new Error('Failed to save resume');
  }
  
  return newResume;
}

export async function updateResume(id: string, updates: Partial<Omit<Resume, '_id' | 'createdAt'>>) {
  if (!id) {
    throw new Error('Resume ID is required');
  }

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
  
  return setLocalStorage<Resume>('resumes', resumes);
}

export async function getResumesByUser(userId: string): Promise<Resume[]> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const resumes = getLocalStorage<Resume>('resumes');
  return resumes.filter(r => r.userId === userId);
}

export async function getResumeById(id: string): Promise<Resume | null> {
  if (!id) {
    throw new Error('Resume ID is required');
  }

  const resumes = getLocalStorage<Resume>('resumes');
  const resume = resumes.find(r => r._id === id);
  return resume || null;
}

export async function deleteResume(id: string): Promise<boolean> {
  if (!id) {
    throw new Error('Resume ID is required');
  }

  const resumes = getLocalStorage<Resume>('resumes');
  const newResumes = resumes.filter(r => r._id !== id);
  
  if (newResumes.length === resumes.length) {
    return false;
  }
  
  return setLocalStorage<Resume>('resumes', newResumes);
}

// User related functions
export async function updateUser(id: string, updates: Partial<Omit<User, '_id' | 'createdAt' | 'password'>>): Promise<boolean> {
  if (!id) {
    throw new Error('User ID is required');
  }

  const users = getLocalStorage<User>('users');
  const userIndex = users.findIndex(u => u._id === id);
  
  if (userIndex === -1) {
    return false;
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updates
  };
  
  return setLocalStorage<User>('users', users);
}

// Helper for checking authentication
export function getCurrentUser(): User | null {
  try {
    const userJson = localStorage.getItem('resumify-user');
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('resumify-token');
}

export function logout(): void {
  localStorage.removeItem('resumify-token');
  localStorage.removeItem('resumify-user');
}

// Export other functions that were in the original file
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
