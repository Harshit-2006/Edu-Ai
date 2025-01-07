import { useParams } from "react-router-dom";
import { useState, useContext, useEffect, useMemo } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { McqContext } from "../context/McqContext";
import { UserDataContext } from "../context/UserDataContext.jsx";

const McqDetailPage = () => {
  const textColor = useColorModeValue("gray.100", "gray.700");
  const { filename } = useParams();
  const { mcqs, getMcqs, loading, error } = useContext(McqContext);
  const { sessionCookie } = useContext(UserDataContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  useEffect(() => {
    if (sessionCookie?.$id) {
      getMcqs(sessionCookie.$id);
    }
  }, [filename, sessionCookie?.$id]);

  // Memoize filtered data to ensure consistency between renders
  const filteredMcqData = useMemo(
    () => mcqs.filter((mcq) => mcq.fileTitle === filename),
    [mcqs, filename]
  );

  const handleNext = () => {
    setAnswerSubmitted(false);
    setSelectedOption(null);
    setCurrentQuestionIndex((prev) =>
      prev < filteredMcqData.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevious = () => {
    setAnswerSubmitted(false);
    setSelectedOption(null);
    setCurrentQuestionIndex((prev) =>
      prev > 0 ? prev - 1 : filteredMcqData.length - 1
    );
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setAnswerSubmitted(true);
  };

  if (loading) {
    return (
      <Box minH="80vh" p={10} textAlign="center">
        <Spinner size="xl" color="orange.400" />
        <Text mt={4}>Loading MCQs...</Text>
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

  if (filteredMcqData.length === 0) {
    return (
      <Box minH="80vh" p={10} bg={textColor}>
        <Heading size="lg" textAlign="center" color="orange.400">
          No MCQs found for file: {filename}
        </Heading>
      </Box>
    );
  }

  const currentQuestion = filteredMcqData[currentQuestionIndex];

  return (
    <Box minH="80vh" p={10} bg={textColor}>
      <VStack spacing={6} align="stretch">
        {/* Display the filename */}
        <Heading size="lg" textAlign="center">
          MCQ File: {filename}
        </Heading>

        {/* Question Box */}
        <Box
          bg={useColorModeValue("white", "gray.800")}
          p={5}
          shadow="md"
          borderRadius="lg"
          borderWidth={1}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {currentQuestion.question}
          </Text>

          {/* Options */}
          <VStack spacing={3} align="stretch">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                size="lg"
                colorScheme={
                  selectedOption
                    ? option === currentQuestion.answer
                      ? "green"
                      : selectedOption === option
                      ? "red"
                      : "gray"
                    : "gray"
                }
                onClick={() => handleOptionClick(option)}
                isDisabled={answerSubmitted}>
                {option}
              </Button>
            ))}
          </VStack>
        </Box>

        {/* Navigation Buttons */}
        <HStack justifyContent="center" spacing={6}>
          <Button colorScheme="teal" variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={handleNext}>
            Next
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default McqDetailPage;
