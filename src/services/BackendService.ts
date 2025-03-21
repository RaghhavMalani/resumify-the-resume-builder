
import { getCurrentUser, getResumesByUser, saveResume, updateResume, loginUser, registerUser } from "./api";
import { toast } from "@/components/ui/use-toast";

export class BackendService {
  static isInitialized = false;

  /**
   * Initialize the backend service
   */
  static async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Check if there's a stored user and validate session
      const user = await getCurrentUser();
      
      if (user) {
        console.log("Backend service initialized with user:", user.name);
      } else {
        console.log("Backend service initialized without active user session");
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error("Error initializing backend service:", error);
    }
  }

  /**
   * Get all resumes for the current user
   */
  static async getUserResumes() {
    try {
      const user = await getCurrentUser();
      if (!user || !user._id) {
        throw new Error("No authenticated user found");
      }
      
      return await getResumesByUser(user._id);
    } catch (error) {
      console.error("Error fetching user resumes:", error);
      throw error;
    }
  }

  /**
   * Create a new resume for the current user
   */
  static async createResume(templateId: string, title: string, content: any) {
    try {
      const user = await getCurrentUser();
      if (!user || !user._id) {
        throw new Error("No authenticated user found");
      }
      
      const resume = {
        userId: user._id,
        templateId,
        title,
        content
      };
      
      return await saveResume(resume);
    } catch (error) {
      console.error("Error creating resume:", error);
      throw error;
    }
  }

  /**
   * Update an existing resume
   */
  static async updateResume(resumeId: string, updates: any) {
    try {
      const success = await updateResume(resumeId, updates);
      
      if (!success) {
        throw new Error("Failed to update resume");
      }
      
      return success;
    } catch (error) {
      console.error("Error updating resume:", error);
      throw error;
    }
  }

  /**
   * Login a user
   */
  static async login(email: string, password: string) {
    try {
      const result = await loginUser(email, password);
      return result;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Register a new user
   */
  static async register(name: string, email: string, password: string) {
    try {
      const result = await registerUser(name, email, password);
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  /**
   * Check the backend status
   */
  static async checkStatus() {
    try {
      await this.initialize();
      return true;
    } catch (error) {
      console.error("Backend status check failed:", error);
      return false;
    }
  }
}

// Initialize the service when the file is imported
BackendService.initialize().catch(console.error);

export default BackendService;
