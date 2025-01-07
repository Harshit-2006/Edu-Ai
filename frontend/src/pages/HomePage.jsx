import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Image,
  Flex,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

const HomePage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqData = [
    {
      question: "What is this application about?",
      answer:
        "This application helps users generate MCQs and flashcards using AI.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply sign up for an account and begin by creating your first set of questions.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const cardBg = useColorModeValue("white", "gray.600");
  // const textColor = useColorModeValue("gray.700", "gray.300");
  const dividerColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box w="full">
      {/* Hero Section */}
      <Box w="full" bg={useColorModeValue("gray.100", "gray.700")} py={12}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          maxW="7xl"
          mx="auto"
          align="center"
          justify="space-between"
          px={4}
          gap={8}>
          <VStack align="flex-start" spacing={6} flex={1}>
            <Heading size="2xl" color="orange.400">
              Transform Your Learning with AI Tools
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue("gray.600", "gray.300")}>
              Discover innovative ways to create MCQs and flashcards with AI
              integration. Save time and enhance productivity effortlessly.
            </Text>
            <HStack as="form" spacing={4} w="full"></HStack>
          </VStack>
          <Box flex={1} w="full" h={{ base: "200px", md: "400px" }}>
            <Image
              src="landingPageImage.jpeg"
              alt="Landing Page image"
              borderRadius="lg"
              shadow="md"
              maxW="100%"
              h="full"
              objectFit="fill"
            />
          </Box>
        </Flex>
      </Box>

      {/* FAQs Section */}
      <Box bg={useColorModeValue("gray.100", "gray.700")} py={10}>
        <Box maxW="7xl" mx="auto" px={4}>
          <Heading textAlign="center" size="lg" color="orange.400">
            Frequently Asked Questions
          </Heading>
          <Divider my={6} borderColor={dividerColor} />
          <VStack spacing={4}>
            {faqData.map((faq, index) => (
              <Box
                key={index}
                bg={cardBg}
                p={4}
                w="full"
                borderRadius="md"
                cursor="pointer"
                onClick={() => toggleFAQ(index)}
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold">{faq.question}</Text>
                  <Icon
                    as={openFaqIndex === index ? FaChevronUp : FaChevronDown}
                    boxSize={6}
                  />
                </Flex>
                {openFaqIndex === index && (
                  <Text mt={2} fontSize="sm">
                    {faq.answer}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
