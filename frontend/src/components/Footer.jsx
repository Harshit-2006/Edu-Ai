import { Link } from "react-router-dom";
import { Box, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
function Footer() {


  const footerItems = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Return Policy", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  function getCurrentYear(){
    return new Date().getFullYear();
  }

  return (
    <Box
      as="footer"
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.700", "gray.400")}
      py={5}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        px={4}
        maxW="6xl"
        mx="auto">

        <Text fontWeight="bold" color="orange.400" fontSize="lg">
          <Link to="/">Edu AI © {getCurrentYear()} </Link>
        </Text>

        {/* Footer Links */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          mt={{ base: 4, md: 0 }}>
          {footerItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              style={{
                color: "inherit",
                textDecoration: "none",
              }}>
              <Text
                _hover={{ color: "orange.400" }}
                transition="color 0.3s ease">
                {item.name}
              </Text>
            </Link>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
}

export default Footer;
