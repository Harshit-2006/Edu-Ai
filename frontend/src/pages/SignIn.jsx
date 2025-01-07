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
  Divider,
  Icon,
  Spinner,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoMdArrowRoundForward, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../appwrite/appwriteUserAuth";
import { UserDataContext } from "../context/UserDataContext";

const SignIn = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { updateUserData } = useContext(UserDataContext);

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
      const response = await service.login(userData);
      if (response) {
        // console.log("Login successful:", response);
        if(response.$id){
          updateUserData(response);
        }
        if(response.err){
          alert(`Error :: ${response.message}`);
          return ;
        }
        navigate(`/dashboard/${response.userId}`);
      }
    } catch (error) {
      console.error("Login failed:", error?.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
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
          Sign In
        </Heading>
        <Text fontSize="lg" color={textColor} maxW="800px">
          Welcome back! Sign in to your account to access your dashboard and
          learning tools.
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
                <FormLabel color={textColor}>Email</FormLabel>
                <Input
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={userData.password}
                    onChange={handleChange}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    required
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
                {isSubmitting ? "Submitting..." : "Sign In"}
              </Button>
            </VStack>
          </form>
          <Divider my={4} />
          <Text fontSize="sm" color={textColor} mt={4}>
            Don’t have an account?{" "}
            <Link
              to="/signUp"
              style={{
                color: "orange",
                fontWeight: "bold",
                textDecoration: "underline",
              }}>
              Sign up here
            </Link>
          </Text>
          <Button
            onClick={handleGoogleSignIn}
            mt={4}
            w="100%"
            colorScheme="orange"
            variant="outline">
            Sign In with Google
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default SignIn;
