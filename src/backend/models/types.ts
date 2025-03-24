
import { ObjectId } from 'mongodb';

export interface User {
  _id?: string | ObjectId;
  email: string;
  name: string;
  password?: string; // Only used during creation, never returned
  createdAt: Date;
  updatedAt?: Date;
}

export interface Resume {
  _id?: string | ObjectId;
  userId: string | ObjectId;
  title: string;
  templateId: string;
  content: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ServerResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
