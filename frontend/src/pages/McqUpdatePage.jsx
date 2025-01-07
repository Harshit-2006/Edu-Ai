
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useMemo } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormLabel,
  useColorModeValue,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { McqContext } from "../context/McqContext";
import { UserDataContext } from "../context/UserDataContext.jsx";

const McqUpdatePage = () => {
  const textColor = useColorModeValue("gray.100", "gray.700");
  const { filename } = useParams();
  const { mcqs, getMcqs, updateMcq, loading, error } = useContext(McqContext);
  const { sessionCookie } = useContext(UserDataContext);
  const [updatedMcqs, setUpdatedMcqs] = useState([]);

  useEffect(() => {
    if (sessionCookie?.$id) {
      getMcqs(sessionCookie.$id);
    }
  }, [filename, sessionCookie?.$id]);

  useEffect(() => {
    setUpdatedMcqs(mcqs);
  }, [mcqs]);

  // Memoize filtered data to ensure consistency between renders
  const filteredMcqData = useMemo(
    () => updatedMcqs.filter((mcq) => mcq.fileTitle === filename),
    [updatedMcqs, filename]
  );

  const handleChange = (mcqId, field, value) => {
    const updatedMcqsCopy = [...updatedMcqs];
    const mcqIndex = updatedMcqsCopy.findIndex((mcq) => mcq.$id === mcqId);
    if (mcqIndex > -1) {
      updatedMcqsCopy[mcqIndex][field] = value;
      setUpdatedMcqs(updatedMcqsCopy);
    }
  };

  const handleOptionChange = (mcqId, optionIndex, value) => {
    const updatedMcqsCopy = [...updatedMcqs];
    const mcqIndex = updatedMcqsCopy.findIndex((mcq) => mcq.$id === mcqId);
    if (mcqIndex > -1) {
      updatedMcqsCopy[mcqIndex].options[optionIndex] = value;
      setUpdatedMcqs(updatedMcqsCopy);
    }
  };

  const handleUpdate = async (mcqId) => {
    // console.log("mcq id for update : ", mcqId);
    const mcqToUpdate = updatedMcqs.find((mcq) => mcq.$id === mcqId);
    if (mcqToUpdate) {
      await updateMcq(mcqToUpdate); // Send the MCQ to the update function
    }
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

  return (
    <Box minH="80vh" p={10} bg={textColor}>
      <VStack spacing={6} align="stretch">
        {/* Display the filename */}
        <Heading size="lg" textAlign="center">
          MCQ File: {filename}
        </Heading>
        {/* Display each MCQ in a card */}
        {filteredMcqData.map((mcq, index) => (
          <Card key={mcq.$id} variant="outline" borderColor="blue.300">
            <CardHeader>
              <Heading size="md">MCQ {index + 1}</Heading>
            </CardHeader>
            <CardBody>
              <FormLabel>Question</FormLabel>
              <Textarea
                placeholder="Question"
                value={mcq.question}
                onChange={(e) =>
                  handleChange(mcq.$id, "question", e.target.value)
                }
              />
              <FormLabel mt={4}>Options</FormLabel>
              {mcq.options &&
                mcq.options.map((option, optIndex) => (
                  <HStack key={optIndex} spacing={2}>
                    <Input
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(mcq.$id, optIndex, e.target.value)
                      }
                    />
                  </HStack>
                ))}
              <FormLabel mt={4}>Answer</FormLabel>
              <Input
                placeholder="Answer"
                value={mcq.answer}
                onChange={(e) =>
                  handleChange(mcq.$id, "answer", e.target.value)
                }
              />
            </CardBody>
            <CardFooter>
              <Button colorScheme="blue" onClick={() => handleUpdate(mcq.$id)}>
                Update
              </Button>
            </CardFooter>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default McqUpdatePage;
