import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import FlashCardDetailPage from "./pages/FlashCardDetailPage.jsx";
import McqDetailPage from "./pages/McqDetailPage.jsx";
import McqUpdatePage from "./pages/McqUpdatePage.jsx";
import FlashCardUpdatePage from "./pages/FlashCardUpdatePage.jsx";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("white", "gray.800")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/mcq/:filename" element={<McqDetailPage />} />
        <Route path="/flashcard/:filename" element={<FlashCardDetailPage />} />
        <Route path="/mcq/update/:filename" element={<McqUpdatePage />} />
        <Route
          path="/flashcard/update/:filename"
          element={<FlashCardUpdatePage />}
        />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
