import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useMemo } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormLabel,
  useColorModeValue,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { FlashCardContext } from "../context/FlashCardContext";
import { UserDataContext } from "../context/UserDataContext.jsx";

const FlashCardUpdatePage = () => {
  const textColor = useColorModeValue("gray.100", "gray.700");
  const { filename } = useParams();
  const { flashCards, getFlashCards, updateFlashCard, loading, error } =
    useContext(FlashCardContext);
  const { sessionCookie } = useContext(UserDataContext);
  const [updatedFlashCards, setUpdatedFlashCards] = useState([]);

  useEffect(() => {
    if (sessionCookie?.$id) {
      getFlashCards(sessionCookie.$id);
    }
  }, [filename, sessionCookie?.$id]);

  useEffect(() => {
    setUpdatedFlashCards(flashCards);
  }, [flashCards]);

  // Memoize filtered data to ensure consistency between renders
  const filteredFlashCards = useMemo(
    () => updatedFlashCards.filter((card) => card.fileTitle === filename),
    [updatedFlashCards, filename]
  );

  const handleChange = (cardId, field, value) => {
    const updatedFlashCardsCopy = [...updatedFlashCards];
    const cardIndex = updatedFlashCardsCopy.findIndex(
      (card) => card.$id === cardId
    );
    if (cardIndex > -1) {
      updatedFlashCardsCopy[cardIndex][field] = value;
      setUpdatedFlashCards(updatedFlashCardsCopy);
    }
  };

  const handleUpdate = async (cardId) => {
    console.log("flash card id for update: ", cardId);
    const cardToUpdate = updatedFlashCards.find((card) => card.$id === cardId);
    if (cardToUpdate) {
      await updateFlashCard(cardToUpdate); // Send the FlashCard to the update function
    }
  };

  if (loading) {
    return (
      <Box minH="80vh" p={10} textAlign="center">
        <Spinner size="xl" color="orange.400" />
        <Text mt={4}>Loading FlashCards...</Text>
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
          No FlashCards found for file: {filename}
        </Heading>
      </Box>
    );
  }

  return (
    <Box minH="80vh" p={10} bg={textColor}>
      <VStack spacing={6} align="stretch">
        {/* Display the filename */}
        <Heading size="lg" textAlign="center">
          FlashCard File: {filename}
        </Heading>

        {/* Display each FlashCard in a card */}
        {filteredFlashCards.map((card, index) => (
          <Card key={card.id} variant="outline" borderColor="blue.300">
            <CardHeader>
              <Heading size="md">FlashCard {index + 1}</Heading>
            </CardHeader>
            <CardBody>
              <FormLabel>Question</FormLabel>
              <Textarea
                placeholder="Question"
                value={card.question}
                onChange={(e) =>
                  handleChange(card.$id, "question", e.target.value)
                }
              />
              <FormLabel mt={4}>Answer</FormLabel>
              <Textarea
                placeholder="Answer"
                value={card.answer}
                onChange={(e) =>
                  handleChange(card.$id, "answer", e.target.value)
                }
              />
              {card.imageUrl && (
                <Box mt={4}>
                  <FormLabel>Image</FormLabel>
                  <Image
                    src={card.imageUrl}
                    alt="FlashCard illustration"
                    maxW="200px"
                    mx="auto"
                    mb={4}
                    borderRadius="md"
                    shadow="sm"
                  />
                </Box>
              )}
            </CardBody>
            <CardFooter>
              <Button colorScheme="blue" onClick={() => handleUpdate(card.$id)}>
                Update
              </Button>
            </CardFooter>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default FlashCardUpdatePage;
