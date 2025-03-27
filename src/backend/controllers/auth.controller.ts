
import { v4 as uuidv4 } from 'uuid';
import { getCollection, toObjectId } from '../db/connection';
import { User, ServerResponse, LoginRequest, RegisterRequest } from '../models/types';
import { hashPassword, comparePassword } from '../utils/auth.utils';
import { ObjectId } from 'mongodb';

export async function register(data: RegisterRequest): Promise<ServerResponse<Omit<User, 'password'>>> {
  try {
    // Input validation
    if (!data.name || !data.email || !data.password) {
      return { 
        success: false, 
        error: 'Name, email and password are required' 
      };
    }
    
    if (data.password.length < 6) {
      return { 
        success: false, 
        error: 'Password must be at least 6 characters' 
      };
    }
    
    const usersCollection = await getCollection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: data.email });
    if (existingUser) {
      return { 
        success: false, 
        error: 'User with this email already exists' 
      };
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(data.password);
    
    const now = new Date();
    // Create user with MongoDB ObjectId
    const newUser: User = {
      _id: new ObjectId(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now
    };
    
    // Insert document without _id to let MongoDB generate it
    const { _id, ...userWithoutId } = newUser;
    const result = await usersCollection.insertOne(userWithoutId);
    
    // Update the user object with the generated _id
    newUser._id = result.insertedId;
    
    // Don't return the password
    const { password, ...userWithoutPassword } = newUser;
    
    return { 
      success: true, 
      data: userWithoutPassword,
      message: 'User registered successfully'
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: 'An error occurred during registration' 
    };
  }
}

export async function login(data: LoginRequest): Promise<ServerResponse<{ user: Omit<User, 'password'>, token: string }>> {
  try {
    if (!data.email || !data.password) {
      return { 
        success: false, 
        error: 'Email and password are required' 
      };
    }

    const usersCollection = await getCollection('users');
    const user = await usersCollection.findOne({ email: data.email });
    
    if (!user) {
      return { 
        success: false, 
        error: 'No user found with this email' 
      };
    }
    
    // Compare passwords
    const passwordMatch = await comparePassword(data.password, user.password as string);
    if (!passwordMatch) {
      return { 
        success: false, 
        error: 'Invalid password' 
      };
    }
    
    // Don't return the password
    const { password, ...userWithoutPassword } = user as unknown as User;
    
    // In a real app, you would generate a JWT token here
    const token = uuidv4();
    
    return { 
      success: true, 
      data: { 
        user: userWithoutPassword, 
        token 
      },
      message: 'Login successful'
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: 'An error occurred during login' 
    };
  }
}

export async function getUserById(id: string | ObjectId): Promise<ServerResponse<User>> {
  try {
    const usersCollection = await getCollection('users');
    const user = await usersCollection.findOne({ _id: toObjectId(id) });
    
    if (!user) {
      return { 
        success: false, 
        error: 'User not found' 
      };
    }
    
    // Don't return the password
    const { password, ...userWithoutPassword } = user as unknown as User;
    
    return { 
      success: true, 
      data: userWithoutPassword as User
    };
  } catch (error) {
    console.error('Get user error:', error);
    return { 
      success: false, 
      error: 'An error occurred while fetching user' 
    };
  }
}

export async function updateUser(id: string | ObjectId, updates: Partial<Omit<User, '_id' | 'createdAt' | 'password'>>): Promise<ServerResponse<boolean>> {
  try {
    const usersCollection = await getCollection('users');
    
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    const result = await usersCollection.updateOne(
      { _id: toObjectId(id) },
      { $set: updateData }
    );
    
    if (result.modifiedCount === 0) {
      return { 
        success: false, 
        error: 'User not found or no changes made' 
      };
    }
    
    return { 
      success: true, 
      data: true,
      message: 'User updated successfully'
    };
  } catch (error) {
    console.error('Update user error:', error);
    return { 
      success: false, 
      error: 'An error occurred while updating user' 
    };
  }
}
