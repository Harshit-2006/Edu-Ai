import { useState, useContext } from "react";
import {
  VStack,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { AddQuestionContext } from "../context/AddQuestionContext";

const GenerateQuestion = ({ onGenerate, fileType, fileName, userId }) => {
  const { handleAddQuestion, loading } = useContext(AddQuestionContext);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = () => {
    if (question.trim() && answer.trim()) {
      handleAddQuestion(
        question.trim(),
        options,
        answer.trim(),
        fileName,
        fileType,
        userId
      );
      setQuestion("");
      setOptions([""]);
      setAnswer("");
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Question</FormLabel>
        <Textarea
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </FormControl>

      {fileType === "mcq" && (
        <FormControl>
          <FormLabel>Options</FormLabel>
          {options.map((option, index) => (
            <Input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(e.target.value, index)}
              mb={2}
            />
          ))}
          {options.length < 4 && (
            <Button onClick={addOption}>Add Option</Button>
          )}
        </FormControl>
      )}

      <FormControl>
        <FormLabel>Answer</FormLabel>
        <Input
          placeholder="Enter Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="orange"
        w="full"
        onClick={handleSubmit}
        isLoading={loading}>
        Add Question
      </Button>
    </VStack>
  );
};

export default GenerateQuestion;
