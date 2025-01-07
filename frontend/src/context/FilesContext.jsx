import { createContext, useState, useContext } from "react";
import service from "../appwrite/appwriteUserFiles.js";
import { UserDataContext } from "../context/UserDataContext.jsx";

export const FilesContext = createContext(null);

export const FilesContextProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  // this userData context gives me the current user id so that its file can be added to the database
  const { sessionCookie } = useContext(UserDataContext);

  const addFile = async (fileName, fileType) => {
    const newFile = {
      title: fileName,
      filename: fileName.toLowerCase().replace(/\s+/g, "-"),
      fileType,
    };
    setFiles((prevFiles) => [...prevFiles, newFile]);
    const userId = sessionCookie.$id;
    // console.log(userId);
    const res = await service.createFile({ fileName, fileType, userId });
    return res;
  };

  const deleteFile = async (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.fileId !== fileId));
    const response = await service.deleteFile(fileId);
    if (response == false) {
      // console.log("file cannot be deleted !!");
      return response;
    }
    // here i have to delete file on the basis of file name

    const deleteFromDatabase = async () => {
      // i have to filter the file so that i can get the type of file that user want to delete
      // if that file is deleted then its data should also be deleted so
      const file = files.filter((file) => {
        return file.fileId == fileId;
      });

      // console.log("file filtered  :",file[0]);

      const whichFile = file[0].fileType;
      if (whichFile === "mcq") {
        // console.log("mcq file deleted so its content is also deleted ");
        // i have to move this to env file
        const mcqUrl = `/api/mcq/deleteMcqs?fileTitle=${file[0].filename}`;
        const response = await fetch(mcqUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(
        //   "deleted all the data of the file : ",
        //   file[0].filename,
        //   response
        // );
      } else {
        // console.log("flashCard file deleted so its content is also deleted ");
        // i have to move this to env file
        const flashCardUrl = `/api/flashCard/deleteFlashcards?fileTitle=${file[0].filename}`;
        const response = await fetch(flashCardUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(
        //   "deleted all the data of the file : ",
        //   file[0].filename,
        //   response
        // );
      }
    };

    await deleteFromDatabase();
  };

  const updateFiles = (files) => {
    // update the files
    const newFiles = files.map((file) => {
      const { fileName, fileType } = file;
      const newFileName = fileName.trim().toLowerCase().replace(/\s+/g, "-");
      const newFile = {
        title: fileName,
        filename: newFileName,
        fileType: fileType,
        fileId: file.$id,
      };
      return newFile;
    });
    setFiles(newFiles);
    // console.log(files);
  };

  return (
    <FilesContext.Provider value={{ files, addFile, deleteFile, updateFiles }}>
      {children}
    </FilesContext.Provider>
  );
};
