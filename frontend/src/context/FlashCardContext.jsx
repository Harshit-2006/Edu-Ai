import { createContext, useState } from "react";

export const FlashCardContext = createContext(null);

export const FlashCardContextProvider = ({ children }) => {
  const [flashCards, setFlashCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addFlashCard = (flashCard) => {
    setFlashCards((prevFlashCards) => [...prevFlashCards, flashCard]);
  };

  const deleteFlashCard = (fileTitle, uid) => {
    setFlashCards((prev) =>
      prev.filter(
        (flashCard) =>
          flashCard.fileTitle !== fileTitle || flashCard.userId !== uid
      )
    );
  };

  const updateFlashCard = async (flashCardToUpdate) => {
    setLoading(true);
    try {
      setFlashCards((prevFlashCards) =>
        prevFlashCards.map((flashCard) =>
          flashCard.$id === flashCardToUpdate.$id
            ? flashCardToUpdate
            : flashCard
        )
      );

      const body = {
        question: flashCardToUpdate.question,
        answer: flashCardToUpdate.answer,
        imageUrl: flashCardToUpdate.imageUrl,
        userId: flashCardToUpdate.userId,
        fileTitle: flashCardToUpdate.fileTitle,
      };

       // base url
       const baseUrl =
       import.meta.env.MODE === "production"
         ? import.meta.env.VITE_BACKEND_URL
         : import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(
        baseUrl + `/api/flashCard/updateFlashcard/${flashCardToUpdate.$id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update FlashCard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFlashCards = async (userId) => {
    setLoading(true);
    setError(null);
    // this is the api url from which i will fetch the flashcards and
    // for now i have kept it clearly visible but later on i will add
    // it to the env file
    // console.log("apiUrl hit.....");


     // base url
     const baseUrl =
     import.meta.env.MODE === "production"
       ? import.meta.env.VITE_BACKEND_URL
       : import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    const apiUrl = baseUrl+`/api/flashcard/getFlashCards/${userId}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch flashcards");
      const responseData = await response.json();
      // console.log("responseData from the api : ", responseData);
      if (responseData.success === "true" && responseData.data?.documents) {
        setFlashCards(responseData.data.documents);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlashCardContext.Provider
      value={{
        flashCards,
        addFlashCard,
        deleteFlashCard,
        updateFlashCard,
        getFlashCards,
        loading,
        error,
      }}>
      {children}
    </FlashCardContext.Provider>
  );
};

export default FlashCardContextProvider;
