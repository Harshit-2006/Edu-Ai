import service from "../config/appwriteflashCardDb.js";

const getFlashcards = async (req, res) => {
  try {
    const databaseResponse = await service.getFlashcards(req.params.id);
    if (databaseResponse.err) {
      throw databaseResponse.err;
    }
    res.status(200).json({ success: "true", data: databaseResponse });
  } catch (error) {
    console.error("Appwrite service :: getFlashcards :: error :", error);
    res.status(error.code || 500).json({
      success: "false",
      message: error.response?.message || "Server error fetching the flashcards",
      details: error.response || null,
    });
  }
};

const createFlashcard = async (req, res) => {
  const flashcard = req.body;
  console.log(flashcard);
  try {
    if (
      !flashcard.question ||
      !flashcard.answer ||
      !flashcard.fileTitle ||
      !flashcard.userId
    ) {
      throw new Error("Field/fields missing while creating flashcard");
    }
    const databaseResponse = await service.createFlashcard(flashcard);
    res.status(201).json({ success: "true", data: databaseResponse });
  } catch (error) {
    console.error("Appwrite service :: createFlashcard :: error :", error);
    res.status(error.code || 400).json({
      success: "false",
      message: error.response?.message || "Please provide all the fields",
      details: error.response || null,
    });
  }
};

const updateFlashcard = async (req, res) => {
  const updatedFlashcard = req.body;
  console.log("Updated flashcard sent by the client: ", updatedFlashcard);
  try {
    const databaseResponse = await service.updateFlashcard(
      req.params.flashcardId,
      updatedFlashcard
    );
    if (databaseResponse.err) {
      throw databaseResponse.err;
    }
    console.log(
      "Response from router write on update flashcard: ",
      databaseResponse
    );
    res.status(200).json({ success: "true", data: databaseResponse });
  } catch (error) {
    console.error("Appwrite service :: updateFlashcard :: error :", error);
    res.status(error.code || 500).json({
      success: "false",
      message:
        error.response?.message ||
        "Document with the requested ID could not be found.",
      details: error.response || null,
    });
  }
};

const deleteFlashcardById = async (req, res) => {
  try {
    const databaseResponse = await service.deleteFlashcardById(req.params.id);
    if (databaseResponse.err) {
      throw databaseResponse.err;
    }
    res.status(200).json({ success: "true", data: databaseResponse });
  } catch (error) {
    console.error("Appwrite service :: deleteFlashcardById :: error :", error);
    res.status(error.code || 500).json({
      success: "false",
      message:
        error.response?.message ||
        "Server error while deleting the flashcard",
      details: error.response || null,
    });
  }
};

const deleteFlashcardsByFileTitle = async (req, res) => {
  const fileTitleName = req.query.fileTitle;
  console.log("File title sent by the client: ", fileTitleName);

  try {
    if (!fileTitleName) {
      return res.status(400).json({
        success: "false",
        message: "File title is required.",
      });
    }

    const databaseResponse = await service.deleteFlashcardsByFileTitle(
      fileTitleName
    );
    if (databaseResponse.err) {
      throw databaseResponse.err;
    }
    console.log("Response from the database: ", databaseResponse);
    res.status(200).json({
      success: "true",
      data: databaseResponse,
    });
  } catch (error) {
    console.error(
      "Appwrite service :: deleteFlashcardsByFileTitle :: error :",
      error
    );
    res.status(error.code || 500).json({
      success: "false",
      message:
        error.response?.message ||
        "Document with the specified file title could not be found.",
      details: error.response || null,
    });
  }
};

export {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcardById,
  deleteFlashcardsByFileTitle,
};
