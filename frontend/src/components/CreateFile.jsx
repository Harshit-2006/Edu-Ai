import { useState } from "react";
import {
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";

const CreateFile = ({ onCreate }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSubmit = () => {
    if (fileName.trim() === "") return;
    onCreate(fileName.trim());
    setFileName(""); 
  };

  return (
    <VStack spacing={4}>
      <Input
        borderColor="orange"
        placeholder="File Name"
        value={fileName}
        onChange={handleChange}
      />
      <Button colorScheme="orange" onClick={handleSubmit} w="full">
        Create
      </Button>
    </VStack>
  );
};

export default CreateFile;
