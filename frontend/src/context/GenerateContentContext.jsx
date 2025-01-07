// GenerateContentContext.js
import { createContext, useState } from "react";

export const GenerateContentContext = createContext();

export const GenerateContentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerateData = async (
    inputType,
    inputValue,
    totalQuestions,
    fileName, // in the backend it is called fileTitle
    whichFile,
    userId
  ) => {
    setLoading(true);

    const mcqUrl = "/api/generate/mcqs";
    const flashCardUrl = "/api/generate/flashcards";

    try {
      // console.log("inside the context file for generating the content");
      // console.log("inputType : ", inputType);
      // console.log("inputValue : ", inputValue);
      // console.log("totalQuestions : ", totalQuestions);
      // console.log("fileName : ", fileName);
      // console.log("whichFile : ", whichFile);

      // Ensure the correct URL is chosen based on the file type
      const apiUrl = whichFile === "mcq" ? mcqUrl : flashCardUrl;

      // Construct the body dynamically based on inputType
      const body = {
        ...(inputType === "topic"
          ? { topic: inputValue }
          : { text: inputValue }),
        totalQuestions: totalQuestions,
        fileTitle: fileName,
        userId: userId, // userId fetch from the session has to be implemented
      };

      // console.log("body sent from the context: ", body);

      // Fetch to send the data to the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GenerateContentContext.Provider
      value={{
        handleGenerateData,
        loading,
      }}>
      {children}
    </GenerateContentContext.Provider>
  );
};
