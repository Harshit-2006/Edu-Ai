import { Client, Databases, ID, Query } from "appwrite";
import env from "dotenv";

env.config();

class McqService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(process.env.APPWRITE_URL)
      .setProject(process.env.APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }

  // function to create mcq
  async createMcq(mcqData) {
    // mcqData is in the format of {question, answer, options, fileTitle, userId}
    try {
      const databaseResponse = await this.database.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_MCQS_ID,
        ID.unique(),
        mcqData
      );
      return databaseResponse;
    } catch (error) {
      console.error("Appwrite Service :: createMcq :: error :", error);
      return { err: error, message: error };
    }
  }

  // function to updata the mcq
  async updateMcq(mcqId, updatedMcq) {
    // updatedMcq is in the format of {question, answer, options, fileTitle}
    try {
      const databaseResponse = await this.database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_MCQS_ID,
        mcqId,
        updatedMcq
      );
      return databaseResponse;
    } catch (error) {
      console.error("Appwrite service :: updateMcq :: error :", error);
      return { err: error, message: error };
    }
  }

  // function to delete the mcq by the mcqID(documentId)
  async deleteMcqById(mcqId) {
    try {
      const databaseResponse = await this.database.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_MCQS_ID,
        mcqId
      );
      return databaseResponse;
    } catch (error) {
      console.error("Appwrite service :: deleteMcq :: error :", error);
      return { err: error, message: error };
    }
  }

  // function to delete the mcq by the fileTitle
  async deleteMcqByFileTitle(fileTitle) {
    try {
      const result = await this.database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_MCQS_ID,
        [Query.equal("fileTitle", fileTitle)]
      );

      if (result.total === 0) {
        console.log(`No MCQs found with fileTitle: ${fileTitle}`);
        return {
          success: false,
          message: "No documents found with the given fileTitle",
        };
      }
      for (const document of result.documents) {
        await this.database.deleteDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_COLLECTION_MCQS_ID,
          document.$id
        );
        console.log(`Deleted document with ID: ${document.$id}`);
      }

      return { success: true, message: "Documents deleted successfully" };
    } catch (error) {
      console.error(
        "Appwrite service :: deleteMcqByFileTitle :: error :",
        error
      );
      return { success: false, err: error, message: error.message };
    }
  }


  // function to get the mcq for  the particular user if he enters in the website
  async getMcqs(userId) {
    try {
      const databaseResponse = await this.database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_MCQS_ID,
        [Query.equal("userId", userId)]
      );
      return databaseResponse;
    } catch (error) {
      console.error("Appwrite service :: getMcqs :: error :", error);
      return { err: error, message: error };
    }
  }
}

const service = new McqService();

export default service;
