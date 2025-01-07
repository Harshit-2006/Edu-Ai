import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FilesContextProvider } from "./context/FilesContext.jsx";
import { McqContextProvider } from "./context/McqContext.jsx";
import { FlashCardContextProvider } from "./context/FlashCardContext.jsx";
import { GenerateContentProvider } from "./context/GenerateContentContext.jsx";
import { UserDataContextProvider } from "./context/UserDataContext.jsx";
import { AddQuestionProvider } from "./context/AddQuestionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserDataContextProvider>
      <FilesContextProvider>
        <FlashCardContextProvider>
          <McqContextProvider>
            <AddQuestionProvider>
              <GenerateContentProvider>
                <BrowserRouter>
                  <ChakraProvider>
                    <App />
                  </ChakraProvider>
                </BrowserRouter>
              </GenerateContentProvider>
            </AddQuestionProvider>
          </McqContextProvider>
        </FlashCardContextProvider>
      </FilesContextProvider>
    </UserDataContextProvider>
  </React.StrictMode>
);
