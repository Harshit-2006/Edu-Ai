import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useMemo } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Spinner,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { FlashCardContext } from "../context/FlashCardContext";
import { UserDataContext } from "../context/UserDataContext.jsx";

const FlashCardDetailPage = () => {
  const textColor = useColorModeValue("gray.100", "gray.700");
  const { filename } = useParams();
  const navigate = useNavigate(); 
  const { flashCards, getFlashCards, loading, error } = useContext(FlashCardContext);
  const { sessionCookie } = useContext(UserDataContext);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Memoize filtered data to ensure consistency between renders
  const filteredFlashCards = useMemo(
    () => flashCards.filter((card) => card.fileTitle === filename),
    [flashCards, filename]
  );

  useEffect(() => {
    if (sessionCookie?.$id) {
      getFlashCards(sessionCookie.$id);
    }
  }, [filename, sessionCookie?.$id]);

  const handleNext = () => {
    setShowAnswer(false);

    if (currentCardIndex < filteredFlashCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // Redirect back when all flashcards are viewed
      navigate(-1);
    }
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) =>
      prev > 0 ? prev - 1 : filteredFlashCards.length - 1
    );
  };

  if (loading) {
    return (
      <Box minH="80vh" p={10} textAlign="center">
        <Spinner size="xl" color="orange.400" />
        <Text mt={4}>Loading Flashcards...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="80vh" p={10} textAlign="center" color="red.500">
        <Heading size="lg">Error</Heading>
        <Text>{error}</Text>
      </Box>
    );
  }

  if (filteredFlashCards.length === 0) {
    return (
      <Box minH="80vh" p={10} bg={textColor}>
        <Heading size="lg" textAlign="center" color="orange.400">
          No flashcards found for file: {filename}
        </Heading>
      </Box>
    );
  }

  const currentCard = filteredFlashCards[currentCardIndex];

  return (
    <Box minH="80vh" p={10} bg={textColor}>
      <VStack spacing={6} align="stretch">
        {/* Display the filename */}
        <Heading size="lg" textAlign="center">
          Flash Card File: {filename}
        </Heading>

        {/* Flashcard Content */}
        <Box
          bg={useColorModeValue("white", "gray.800")}
          p={5}
          shadow="md"
          borderRadius="lg"
          borderWidth={1}
          textAlign="center"
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {currentCard.question}
          </Text>
          {currentCard.imageUrl && (
            <Image
              src={currentCard.imageUrl}
              alt="Flashcard illustration"
              maxW="200px"
              mx="auto"
              mb={4}
              borderRadius="md"
              shadow="sm"
            />
          )}
          {showAnswer ? (
            <Text fontSize="lg" color="green.500" fontWeight="bold" mt={4}>
              {currentCard.answer}
            </Text>
          ) : (
            <Button
              colorScheme="blue"
              onClick={() => setShowAnswer(true)}
              mt={4}
            >
              Show Answer
            </Button>
          )}
        </Box>

        {/* Navigation Buttons */}
        <HStack justifyContent="center" spacing={6}>
          <Button colorScheme="teal" variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={handleNext}>
            {currentCardIndex < filteredFlashCards.length - 1 ? "Next" : "Finish"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FlashCardDetailPage;
