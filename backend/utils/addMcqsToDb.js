import service from "../config/appwriteMcqDb.js";
import processGoogleResponse from "../utils/processGoogleResponse.js";

const addMcqsToDb = async (aiResponse, requestBody) => {
    // aiResponse is already in json form but some modification is to be required
    try {
        const mcqs = processGoogleResponse(aiResponse);
        //Insert each MCQ into the database
        await Promise.all(
            mcqs.map(({ question, options, correctAnswer }) =>
                service.createMcq({
                    question,
                    options,
                    answer : correctAnswer,
                    fileTitle: requestBody.fileTitle, 
                    userId: requestBody.userId, 
                })
            )
        );
        // below code is for checking
        // mcqs.forEach((mcq) => {
        //     console.log(`Question: ${mcq.question}`);
        //     console.log(`Options: ${mcq.options.join(', ')}`);
        //     console.log(`Correct Answer: ${mcq.correctAnswer}`);
        //     console.log('-------------------------');

        //     // Add to database function (example)
        //     // addToDatabase(mcq);
        // });
        console.log("All MCQs successfully added to the database");
        
    } catch (error) {
        console.error("Error adding MCQs to database:", error);
        throw error; // Rethrow error
    }
};

export default addMcqsToDb;
