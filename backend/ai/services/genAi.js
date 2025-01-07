import axios from "axios";
import env from "dotenv";

env.config();

const modelUsed = "gemini-1.5-flash";
const googleGeminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelUsed}:generateContent?key=${process.env.GOOGLE_GEMINI_API_KEY}`;
const headers = {
  "Content-Type": "application/json",
};
const generateQuestions = async (userPrompt) => {
  const body = {
    contents: [
      {
        parts: [
          {
            text: userPrompt,
          },
        ],
      },
    ],
  };
  try {
    const response = await axios.post(googleGeminiUrl, body, headers);
    console.log(
      "response after axios hit the url (response.data.candidates[0].content.parts[0]) :",
      response.data.candidates[0].content.parts[0]
    );
    // returning only till parts[0] text prop of the object will we extracted out by the calling function
    return response.data.candidates[0].content.parts[0];
  } catch (error) {
    console.log({ success: "false", message: error });
    return { success: "false", message: error };
  }
};

export default generateQuestions;
