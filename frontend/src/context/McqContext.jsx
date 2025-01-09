import { createContext, useState } from "react";

export const McqContext = createContext(null);

export const McqContextProvider = ({ children }) => {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMcq = (mcq) => {
    setMcqs((prevMcqs) => [...prevMcqs, mcq]);
  };

  const deleteMcq = (fileTitle, uid) => {
    setMcqs((prev) =>
      prev.filter((mcq) => mcq.fileTitle !== fileTitle || mcq.userId !== uid)
    );
  };

  const updateMcq = async (mcqToUpdate) => {
    setLoading(true);
    try {
      setMcqs((prevMcqs) =>
        prevMcqs.map((mcq) => (mcq.$id === mcqToUpdate.$id ? mcqToUpdate : mcq))
      );

      const body = {
        question: mcqToUpdate.question,
        answer: mcqToUpdate.answer,
        options: mcqToUpdate.options,
        userId: mcqToUpdate.userId,
        fileTitle: mcqToUpdate.fileTitle,
      };

      // base url
      const baseUrl =
        import.meta.env.MODE === "production"
          ? import.meta.env.VITE_BACKEND_URL
          : import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(
        baseUrl + `/api/mcq/updateMcq/${mcqToUpdate.$id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update MCQ");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMcqs = async (userId) => {
    setLoading(true);
    setError(null);
    // this is the api url from which i will fetch the mcqs and
    // for now i have kept it clearly visible but later on i will add
    // it to the env file

    // base url
    const baseUrl =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    const apiUrl = baseUrl + `/api/mcq/getMcqs/${userId}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch MCQs");
      const responseData = await response.json();
      // console.log("responseData from the api : ", responseData);
      if (responseData.success === "true" && responseData.data?.documents) {
        setMcqs(responseData.data.documents);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching MCQs:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <McqContext.Provider
      value={{ mcqs, addMcq, deleteMcq, updateMcq, getMcqs, loading, error }}>
      {children}
    </McqContext.Provider>
  );
};
