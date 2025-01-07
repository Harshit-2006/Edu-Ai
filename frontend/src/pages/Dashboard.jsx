import {
  Box,
  Button,
  Grid,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import McqFile from "../components/McqFile";
import FlashCardFile from "../components/FlashCardFile";
import { useEffect, useState, useContext } from "react";
import CreateFile from "../components/CreateFile";
import GenerateViaAi from "../components/GenerateViaAi";
import GenerateQuestion from "../components/GenerateQuestion";
import { FilesContext } from "../context/FilesContext";
import { GenerateContentContext } from "../context/GenerateContentContext";
import { AddQuestionContext } from "../context/AddQuestionContext";
import service from "../appwrite/appwriteUserFiles.js";
import { UserDataContext } from "../context/UserDataContext.jsx";

const Dashboard = () => {
  const { sessionCookie } = useContext(UserDataContext);
  const { files, addFile, deleteFile, updateFiles } = useContext(FilesContext);

  useEffect(() => {
    const getFiles = async () => {
      const filesInDatabase = await service.getUserFiles(sessionCookie.$id);
      updateFiles(filesInDatabase);
    };
    getFiles();
  }, [sessionCookie.$id]);

  const { handleGenerateData, loading: generateLoading } = useContext(
    GenerateContentContext
  );
  const { handleAddQuestion, loading: addQuestionLoading } =
    useContext(AddQuestionContext);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [currentFileType, setCurrentFileType] = useState("");
  const [fileName, setFileName] = useState("");

  const [whichFile, setWhichFile] = useState(null);

  const openCreateModal = (fileType) => {
    setCurrentFileType(fileType);
    setIsCreateModalOpen(true);
  };

  const openAiModal = (fileNameOnClick, whichFile) => {
    setWhichFile(whichFile);
    setFileName(fileNameOnClick);
    setIsAiModalOpen(true);
  };

  const openAddQuestionModal = (fileNameOnClick, whichFile) => {
    setWhichFile(whichFile);
    setFileName(fileNameOnClick);
    setIsAddQuestionModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsAiModalOpen(false);
    setIsAddQuestionModalOpen(false);
    setCurrentFileType("");
    setFileName("");
  };

  const handleCreateFile = (fileName, fileType = currentFileType) => {
    const res = addFile(fileName, fileType);
    if (res.err) {
      alert("server Error :: file not added to the database");
    }
    closeModal();
  };

  const handleGenerateDataWrapper = (inputType, inputValue, totalQuestions) => {
    closeModal();
    handleGenerateData(
      inputType,
      inputValue,
      totalQuestions,
      fileName,
      whichFile,
      sessionCookie.$id
    );
  };

  const handleAddQuestionWrapper = (question, options, answer) => {
    closeModal();
    handleAddQuestion(
      question,
      options,
      answer,
      fileName,
      whichFile,
      sessionCookie.$id
    );
  };

  return (
    <Box minH="80vh" p={10} bg={useColorModeValue("gray.100", "gray.700")}>
      <Grid
        templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
        gap={6}
        mb={6}>
        {files.map((file) => {
          if (file.fileType === "mcq") {
            return (
              <McqFile
                key={file.filename}
                title={file.title}
                filename={file.filename}
                fileId={file.fileId}
                deleteFile={deleteFile}
                onAiGenerate={openAiModal}
                onAddQuestion={openAddQuestionModal}
              />
            );
          }
          if (file.fileType === "flashCard") {
            return (
              <FlashCardFile
                key={file.filename}
                title={file.title}
                filename={file.filename}
                fileId={file.fileId}
                deleteFile={deleteFile}
                onAiGenerate={openAiModal}
                onAddQuestion={openAddQuestionModal} 
              />
            );
          }
        })}
      </Grid>

      {(generateLoading || addQuestionLoading) && (
        <Spinner
          position="fixed"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
        />
      )}

      {/* Floating Buttons */}
      <Box position="fixed" bottom="70px" right="4" zIndex="2">
        <Button
          colorScheme="orange"
          onClick={() => openCreateModal("mcq")}
          _hover={{ boxShadow: "lg" }}>
          <FaPlusCircle style={{ marginRight: "10px" }} /> Create MCQ File
        </Button>
      </Box>
      <Box position="fixed" bottom="120px" right="4" zIndex="2">
        <Button
          colorScheme="orange"
          onClick={() => openCreateModal("flashCard")}
          _hover={{ boxShadow: "lg" }}>
          <FaPlusCircle style={{ marginRight: "10px" }} /> Create FlashCard File
        </Button>
      </Box>

      {/* Create File Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Create {currentFileType === "mcq" ? "MCQ" : "Flashcard"} File
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateFile onCreate={handleCreateFile} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* AI Generation Modal */}
      <Modal isOpen={isAiModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Content via AI</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={5}>
            <GenerateViaAi onGenerate={handleGenerateDataWrapper} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Add Question Modal */}
      <Modal isOpen={isAddQuestionModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={5}>
            <GenerateQuestion
              onGenerate={handleAddQuestionWrapper}
              fileType={whichFile}
              fileName={fileName}
              userId={sessionCookie.$id}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default Dashboard;
