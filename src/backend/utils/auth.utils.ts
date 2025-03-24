
import * as bcrypt from 'bcryptjs';

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare a password with a hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Check if a token is valid
export function isValidToken(token: string): boolean {
  // In a real app, you would verify JWT token
  // For now, we'll just check if it exists
  return !!token && token.length > 10;
}

// Get user ID from token
export function getUserIdFromToken(token: string): string | null {
  // In a real app, you would decode JWT token
  // For now, we'll just return a mock ID
  return isValidToken(token) ? 'mock-user-id' : null;
}
