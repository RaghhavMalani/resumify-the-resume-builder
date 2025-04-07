
// Re-export from the main mongodb.ts file for easier imports
export { 
  clientPromise,
  getDatabase,
  getCollection,
  convertToObjectId,
  isValidObjectId
} from '../../lib/mongodb';
