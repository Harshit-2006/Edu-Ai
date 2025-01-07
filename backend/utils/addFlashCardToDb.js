import service from "../config/appwriteflashCardDb.js";
import processGoogleResponse from "../utils/processGoogleResponse.js";

const addFlashCardsToDb = async (aiResponse,requestBody) => {
    // aiResponse is already in JSON form but some modification may be required
    try {
        const flashCards = processGoogleResponse(aiResponse);
        // Insert each flashcard into the database
        await Promise.all(
            flashCards.map(({ question, correctAnswer }) =>
                service.createFlashcard({
                    question,
                    answer: correctAnswer,
                    fileTitle: requestBody.fileTitle, 
                    userId: requestBody.userId,
                })
            )
        );
        // For checking
        // flashCards.forEach((flashCard) => {
        //     console.log(`Question: ${flashCard.question}`);
        //     console.log(`Answer: ${flashCard.correctAnswer}`);
        //     console.log('-------------------------');

        //     // Add to database function (example)
        //     // addToDatabase(flashCard);
        // });
        console.log("All flashcards successfully added to the database");
        // return to the calling function to tell it about the success  
        return {success : "true", message : "All flashcards successfully added to the database"}
    } catch (error) {
        console.error("Error adding flashcards to database:", error);
        throw error; // Rethrow error
    }
};

export default addFlashCardsToDb;
