import { GiFiles } from "react-icons/gi";
import { FaPlusSquare } from "react-icons/fa";
import { CiPen } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
import { GiChaingun } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  Button,
  CardFooter,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

const FlashCardFile = ({
  title = "New Flashcard File",
  fileId,
  filename = "default",
  deleteFile,
  onAiGenerate,
  onAddQuestion,
}) => {

  // navigate so that the user may navigate to the update flashcard page
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    const whichFile = "flashCard";
    e.preventDefault();
    const whichButton = e.currentTarget.dataset.name;
    // console.log("this is from flashCardFile.jsx", whichButton);
    if (whichButton === "delete") {
      const res = deleteFile(fileId);
      if (res === false) {
        alert("Server Error :: flash card cannot be deleted");
      }
    } else if (whichButton === "ai") {
      onAiGenerate(filename, whichFile);
    } else if (whichButton === "add") {
      onAddQuestion(filename, whichFile);
    } else if (whichButton === "edit") {
      navigate(`/flashcard/update/${filename}`);
    }
  };

  return (
    <>
      <Link to={`/flashcard/${filename}`}>
        <Card
          maxW={350}
          display="flex"
          bg={useColorModeValue("gray.200", "gray.800")}
          borderColor={"orange.300"}
          borderWidth={2}
          cursor="pointer"
          _hover={{ boxShadow: "lg", transform: "scale(1.03)" }}
          transition="all 0.3s">
          <CardBody justifyContent="center" alignItems="center">
            <Center>
              <GiFiles
                size="80"
                color={useColorModeValue("#3182ce", "#63b3ed")}
              />
            </Center>
            <Stack mt="2" spacing="3" align="center">
              <Heading size="sm" textAlign="center">
                {title}
              </Heading>
            </Stack>
          </CardBody>

          <Divider />

          <CardFooter justifyContent="space-between" p={3}>
            <Button
              p={1}
              marginRight={2}
              colorScheme="orange"
              variant="solid"
              size="sm"
              data-name="add"
              onClick={handleButtonClick}>
              <FaPlusSquare size="25" />
            </Button>
            <Button
              p={1}
              marginRight={2}
              colorScheme="orange"
              variant="solid"
              size="sm"
              data-name="edit"
              onClick={handleButtonClick}>
              <CiPen size="25" />
            </Button>
            <Button
              p={1}
              marginRight={2}
              colorScheme="orange"
              variant="solid"
              size="sm"
              data-name="delete"
              onClick={handleButtonClick}>
              <MdDeleteSweep size="25" />
            </Button>
            <Button
              p={1}
              marginRight={2}
              colorScheme="orange"
              variant="solid"
              size="sm"
              data-name="ai"
              onClick={handleButtonClick}>
              <GiChaingun size="25" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default FlashCardFile;
