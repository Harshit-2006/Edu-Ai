import { createContext, useState } from "react";

export const AddQuestionContext = createContext();

export const AddQuestionProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleAddQuestion = async (
    question,
    options,
    answer,
    fileName,
    whichFile,
    userId
  ) => {
    setLoading(true);

    const mcqUrl = "/api/mcq/createMcq";
    const flashCardUrl = "/api/flashCard/createFlashcard";

    try {
      // console.log("inside the context file for adding a question");
      // console.log("question : ", question);
      // console.log("options : ", options);
      // console.log("answer : ", answer);
      // console.log("fileName : ", fileName);
      // console.log("whichFile : ", whichFile);

      // Ensure the correct URL is chosen based on the file type
      const apiUrl = whichFile === "mcq" ? mcqUrl : flashCardUrl;

      // Construct the body dynamically based on the file type
      const body = {
        question: question,
        answer: answer,
        fileTitle: fileName,
        userId: userId,
        ...(whichFile === "mcq" && {
          options: options.filter((option) => option.trim()),
        }),
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
    <AddQuestionContext.Provider
      value={{
        handleAddQuestion,
        loading,
      }}>
      {children}
    </AddQuestionContext.Provider>
  );
};
