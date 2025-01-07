import {
  flashCardTopicPrompt,
  flashCardTextPrompt,
} from "../ai/prompts/flashCardPrompt.js";
import { mcqTopicPrompt, mcqTextPrompt } from "../ai/prompts/mcqPrompt.js";
import generateQuestions from "../ai/services/genAi.js";
import addFlashCardToDb from "../utils/addFlashCardToDb.js";
import addMcqsToDb from "../utils/addMcqsToDb.js";

// this is used to manage the generation of the prompt on the basis of the input either the flashcard or the mcq
const processGeneration = async (
  requestBody,
  promptFunction,
  dbFunction,
  entityType
) => {
  const { topic, text, totalQuestions } = requestBody;

  const prompt = topic
    ? promptFunction(topic, totalQuestions)
    : promptFunction(text, totalQuestions);

  // this aiResponse will receive the json type data from the ai
  const aiResponse = await generateQuestions(prompt);
  // now we will send the ai response to the db function so that it gets stored in the database.
  try {
    await dbFunction(aiResponse, requestBody);
    return {
      status: 200,
      success: "true",
      message: `All ${entityType} successfully added to the database`,
    };
  } catch (error) {
    console.error(`Error saving ${entityType} to DB:`, error);
    throw { status: 500, message: `Failed to save ${entityType} to database.` };
  }
};

const getGeneratedMcqs = async (req, res) => {
  try {
    console.log(req.body);
    const requestBody = req.body;
    if (!requestBody) {
      throw { status: 400, message: "Error: requestBody missing" };
    }

    const { topic, text, totalQuestions } = requestBody;
    if (topic && text) {
      throw {
        status: 400,
        message:
          "Error: 'topic' and 'text' fields cannot both be in the request body",
      };
    }

    if ((topic || text) && totalQuestions) {
      const promptFunction = topic ? mcqTopicPrompt : mcqTextPrompt;
      const response = await processGeneration(
        requestBody,
        promptFunction,
        addMcqsToDb,
        "MCQs"
      );
      if (response.status == 200) {
        res.status(200).json(response);
      }
    } else {
      throw {
        status: 400,
        message: "Invalid request: missing required fields",
      };
    }

    return {
      success: "true",
      message: "MCQs generated and saved successfully",
    };
  } catch (error) {
    console.error(error);
    const statusCode = error.status || 500;
    return {
      success: "false",
      message: error.message || "Internal server error",
    };
  }
};

const getGeneratedFlashcards = async (req, res) => {
  try {
    const requestBody = req.body;
    if (!requestBody) {
      throw { status: 400, message: "Error: requestBody missing" };
    }

    const { topic, text, totalQuestions } = requestBody;
    if (topic && text) {
      throw {
        status: 400,
        message:
          "Error: 'topic' and 'text' fields cannot both be in the request body",
      };
    }

    if ((topic || text) && totalQuestions) {
      const promptFunction = topic ? flashCardTopicPrompt : flashCardTextPrompt;
      const response = await processGeneration(
        requestBody,
        promptFunction,
        addFlashCardToDb,
        "flashcards"
      );
      if (response.status == 200) {
        res.status(200).json(response);
      }
    } else {
      throw {
        status: 400,
        message: "Invalid request: missing required fields",
      };
    }

    return {
      success: "true",
      message: "Flashcards generated and saved successfully",
    };
  } catch (error) {
    console.error(error);
    const statusCode = error.status || 500;
    return {
      success: "false",
      message: error.message || "Internal server error",
    };
  }
};

export { getGeneratedMcqs, getGeneratedFlashcards };
