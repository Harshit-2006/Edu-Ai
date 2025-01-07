import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

const About = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      maxW="full"
      mx="auto"
      px={4}
      py={8}
      textAlign="center"
      color="white"
      borderRadius="md"
      bg={useColorModeValue("gray.100", "gray.700")}
      >
      <VStack spacing={6}>
        <Heading size="2xl" textTransform="uppercase" color={"orange.400"}>
          About Edu Ai 📚
        </Heading>
        <Text fontSize="lg" color={textColor} maxW="800px">
          Welcome to Edu AI, an innovative application that leverages the power
          of Artificial Intelligence to transform the way you learn. Our
          platform generates intelligent multiple-choice questions (MCQs) and
          flashcards to enhance your educational experience. Designed for
          students, teachers, and lifelong learners, Edu AI aims to make
          learning engaging, efficient, and accessible for everyone.
        </Text>
        <Image
          src="eduAiImage.jpeg"
          alt="About Us"
          borderRadius="lg"
          shadow="md"
          maxW="40%"
        />
        <Text fontSize="lg" color={textColor} maxW="800px">
          Our mission is to use AI to simplify the learning process while
          ensuring quality and relevance. With a user-friendly interface and
          advanced AI capabilities, Edu AI is here to empower you on your
          learning journey.
        </Text>
      </VStack>
    </Box>
  );
};

export default About;
