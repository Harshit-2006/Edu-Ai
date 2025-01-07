import { useState } from "react";
import {
  VStack,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

const GenerateViaAi = ({ onGenerate }) => {

  const [inputType, setInputType] = useState("topic");
  const [inputValue, setInputValue] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");

  const handleSubmit = () => {
    // console.log("inputType: ", inputType);
    // console.log("inputValue: ", inputValue);
    // console.log("totalQuestions: ", totalQuestions);
    if (inputValue.trim() && totalQuestions) {
      onGenerate(inputType, inputValue.trim(), totalQuestions);
      setInputValue("");
      setTotalQuestions("");
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Input Type</FormLabel>
        <RadioGroup
          value={inputType}
          onChange={setInputType}>
          <Stack direction="row">
            <Radio value="topic">Topic</Radio>
            <Radio value="text">Text</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {inputType === "topic" ? (
        <Input
          placeholder="Enter Topic"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <Textarea
          placeholder="Enter Text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}

      <FormControl>
        <FormLabel>Total Questions</FormLabel>
        <NumberInput
          min={1}
          value={totalQuestions}
          onChange={(value) => setTotalQuestions(value)}>
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <Button
        colorScheme="orange"
        w="full"
        onClick={handleSubmit}>
        Generate via AI
      </Button>
    </VStack>
  );
};

export default GenerateViaAi;
