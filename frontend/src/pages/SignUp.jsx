import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Icon,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { IoMdArrowRoundForward, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../appwrite/appwriteUserAuth";
import { UserDataContext } from "../context/UserDataContext.jsx";

const SignUp = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { updateUserData } = useContext(UserDataContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userAccount = await service.createAccount(userData);
      if(userAccount.$id){
        // store it
        updateUserData(userAccount);
      }
      if(userAccount.err){
        alert(`${userAccount.message}`);
        return;
      }
      // console.log("User created successfully:", userAccount);
      navigate("/signIn");
    } catch (error) {
      console.error("Sign Up failed:", error?.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    service.loginWithGoogle();
  };

  return (
    <Box
      maxW="full"
      mx="auto"
      px={4}
      py={8}
      textAlign="center"
      color="white"
      borderRadius="md"
      bg={useColorModeValue("gray.100", "gray.700")}>
      <VStack spacing={6}>
        <Heading size="2xl" textTransform="uppercase" color={"orange.400"}>
          Sign Up
        </Heading>
        <Text fontSize="lg" color={textColor} maxW="800px">
          Create a new account and start your learning journey today!
        </Text>

        <Box
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          borderRadius="lg"
          boxShadow="2xl"
          width="100%"
          maxW="500px"
          mx="auto">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel color={textColor}>Name</FormLabel>
                <Input
                  color={useColorModeValue("gray.600","white")}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={userData.name}
                  onChange={handleChange}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel color={textColor}>Email</FormLabel>
                <Input
                  color={useColorModeValue("gray.600","white")}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={handleChange}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel color={textColor}>Password</FormLabel>
                <InputGroup>
                  <Input
                    color={useColorModeValue("gray.600","white")}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={userData.password}
                    onChange={handleChange}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    required
                    minLength={8}
                    maxLength={265}
                  />
                  <InputRightElement>
                    <Icon
                      as={showPassword ? IoMdEyeOff : IoMdEye}
                      cursor="pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                colorScheme="orange"
                size="lg"
                rightIcon={
                  isSubmitting ? (
                    <Spinner size="sm" />
                  ) : (
                    <IoMdArrowRoundForward />
                  )
                }
                isDisabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </Button>
            </VStack>
          </form>
          <Divider my={4} />
          <Text fontSize="sm" color={textColor} mt={4}>
            Already have an account?{" "}
            <Link
              to="/signIn"
              style={{
                color: "orange",
                fontWeight: "bold",
                textDecoration: "underline",
              }}>
              Sign in here
            </Link>
          </Text>
          <Button
            onClick={handleGoogleSignUp}
            mt={4}
            w="100%"
            colorScheme="orange"
            variant="outline">
            Sign Up with Google
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default SignUp;
