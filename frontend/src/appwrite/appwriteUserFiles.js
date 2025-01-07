import { Client, Databases, Query,ID } from "appwrite";


export class AuthService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL)) //  endpoint
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID)); //  project ID
    this.database = new Databases(this.client);
  }

  // function to get all the files form the appwrite database
  async getUserFiles(userId) {
    try {
      const databaseId = String(import.meta.env.VITE_APPWRITE_DATABASE_ID); // Database ID
      const collectionId = String(import.meta.env.VITE_APPWRITE_COLLECTION_ID); // Collection ID

      const databaseResponse = await this.database.listDocuments(
        databaseId, //database ID
        collectionId, // collection ID
        [Query.equal("userId", userId)] // Query to filter documents
      );
      // console.log("Files in the database :: send from the appwrite service :", databaseResponse.documents);
      return databaseResponse.documents;
    } catch (error) {
      // console.error("Appwrite service :: getUserFiles :: error:", error);
      return { err: error, message: error.message || "An error occurred" };
    }
  }


   // Function to delete file from the database
 async deleteFile (fileId){
  try {
    // console.log("file id give is : ",fileId);
    const databaseId = String(import.meta.env.VITE_APPWRITE_DATABASE_ID); // Database ID
    const collectionId = String(import.meta.env.VITE_APPWRITE_COLLECTION_ID); // Collection ID

    await this.database.deleteDocument(
      databaseId,
      collectionId,
      fileId
    );
    return true;
  } catch (error) {
    //console.error("Appwrite service :: deleteFile :: error", error);
    return false;
  }
}


// Function to create todo
async createFile({ fileName, fileType, userId }) {
  try {
    const databaseId = String(import.meta.env.VITE_APPWRITE_DATABASE_ID); // Database ID
      const collectionId = String(import.meta.env.VITE_APPWRITE_COLLECTION_ID); // Collection ID

    return await this.database.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        fileName,
        fileType,
        userId,
      }
    );
  } catch (error) {
    // console.error("Appwrite service :: createFile :: error", error);
    return {err:error,message:error};
  }
}


}

const service = new AuthService();
export default service;
