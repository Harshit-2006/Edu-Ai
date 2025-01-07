import service from "../config/appwriteMcqDb.js";

const getMcqs = async (req, res) => {
  try {
    const databaseResponse = await service.getMcqs(req.params.id);
    if (databaseResponse.err) {
      throw databaseResponse.err;
    }
    res.status(200).json({ success: "true", data: databaseResponse });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: "false", message: "Server error fetching the mcq" });
  }
};

const createMcq = async (req, res) => {
  const mcq = req.body;
  console.log(mcq);
  try {
    if (
      !mcq.question ||
      !mcq.options ||
      !mcq.answer ||
      !mcq.fileTitle ||
      !mcq.userId
    ) {
      throw "Error : field/fields missing while creating mcq ";
    }
    const databaseResponse = await service.createMcq(mcq);
    res.status(201).json({ success: "true", data: databaseResponse });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: "false", message: "Please provide all the fields" });
  }
};

const updateMcq = async (req, res) => {
  const updatedMcq = req.body;
  console.log("updated mcq send by the client : ", updatedMcq);
  try {
    const databaseResponse = await service.updateMcq(
      req.params.mcqId,
      updatedMcq
    );
    if (databaseResponse.err) {
      throw databaseResponse.err;
    }
    console.log("response from routerwrite on updata mcq : ", databaseResponse);
    res.status(200).json({ success: "true", data: databaseResponse });
  } catch (error) {
    console.log(error);
    if (error.code == 404) {
      return res.status(404).json({
        success: "false",
        message: "Document with the requested ID could not be found.",
      });
    }
    return res.status(500).json({ success: "false", message: "server error" });
  }
};

const deleteMcqById = async (req, res) => {
  try {
    const databaseResponse = await service.deleteMcqById(req.params.id);
    if (databaseResponse.err) {
      throw databaseResponse.err;
    }
    res.status(200).json({ success: "true", data: databaseResponse });
  } catch (error) {
    console.log(error);
    // todo later on : you may handle the 404 error for document not found
    return res.status(500).json({ success: "false", message: "server error" });
  }
};

const deleteMcqByFileTitle = async (req, res) => {
  const fileTitleName = req.query.fileTitle;
  console.log("File title sent by the client: ", fileTitleName);

  try {
    // Check if fileTitle is provided
    if (!fileTitleName) {
      return res.status(400).json({
        success: "false",
        message: "File title is required.",
      });
    }

    const databaseResponse = await service.deleteMcqByFileTitle(fileTitleName);
    if (databaseResponse.err) {
      throw databaseResponse.err;
    }
    console.log("Response from the database: ", databaseResponse);
    res.status(200).json({
      success: "true",
      data: databaseResponse,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 404) {
      return res.status(404).json({
        success: "false",
        message: "Document with the specified file title could not be found.",
      });
    }
    return res.status(500).json({
      success: "false",
      message: "Server error: " + error.message,
    });
  }
};

export { getMcqs, createMcq, updateMcq, deleteMcqById, deleteMcqByFileTitle };
