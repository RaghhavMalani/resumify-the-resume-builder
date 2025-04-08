
// Re-export from the main mongodb.ts file for easier imports
import clientPromise from '../../lib/mongodb';
export default clientPromise;
export { 
  getDatabase,
  getCollection,
  convertToObjectId,
  isValidObjectId
} from '../../lib/mongodb';
