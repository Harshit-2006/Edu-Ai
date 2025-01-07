import { Client, Databases, ID, Query } from "appwrite";
import env from "dotenv";

env.config();

class FlashcardService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(process.env.APPWRITE_URL)
      .setProject(process.env.APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }

  // function to create a flashcard
  async createFlashcard(flashcardData) {
    // flashcardData is in the format of {question, answer, imageUrl, fileTitle, userId}
    try {
      const databaseResponse = await this.database.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_FLASHCARDS_ID,
        ID.unique(),
        flashcardData
      );
      return databaseResponse;
    } catch (error) {
      console.error("Appwrite Service :: createFlashcard :: error :", error);
      return { err: error, message: error };
    }
  }

  // function to update a flashcard
  async updateFlashcard(flashcardId, updatedFlashcard) {
    // updatedFlashcard is in the format of {question, answer, imageUrl, fileTitle}
    try {
      const databaseResponse = await this.database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_FLASHCARDS_ID,
        flashcardId,
        updatedFlashcard
      );
      return databaseResponse;
    } catch (error) {
      console.error("Appwrite service :: updateFlashcard :: error :", error);
      return { err: error, message: error };
    }
  }

  // function to delete a flashcard by the flashcardID (documentId)
  async deleteFlashcardById(flashcardId) {
    try {
      const databaseResponse = await this.database.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_FLASHCARDS_ID,
        flashcardId
      );
      return databaseResponse;
    } catch (error) {
      console.error("Appwrite service :: deleteFlashcardById :: error :", error);
      return { err: error, message: error };
    }
  }

  // function to delete flashcards by the fileTitle
  async deleteFlashcardsByFileTitle(fileTitle) {
    try {
      const result = await this.database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_FLASHCARDS_ID,
        [Query.equal("fileTitle", fileTitle)]
      );

      if (result.total === 0) {
        console.log(`No flashcards found with fileTitle: ${fileTitle}`);
        return {
          success: false,
          message: "No documents found with the given fileTitle",
        };
      }
      for (const document of result.documents) {
        await this.database.deleteDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_COLLECTION_FLASHCARDS_ID,
          document.$id
        );
        console.log(`Deleted document with ID: ${document.$id}`);
      }

      return { success: true, message: "Documents deleted successfully" };
    } catch (error) {
      console.error(
        "Appwrite service :: deleteFlashcardsByFileTitle :: error :",
        error
      );
      return { success: false, err: error, message: error.message };
    }
  }

  // function to get flashcards for the particular user
  async getFlashcards(userId) {
    try {
      const databaseResponse = await this.database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_FLASHCARDS_ID,
        [Query.equal("userId", userId)]
      );
      return databaseResponse;
    } catch (error) {
      console.error("Appwrite service :: getFlashcards :: error :", error);
      return { err: error, message: error };
    }
  }
}

const service = new FlashcardService();

export default service;
