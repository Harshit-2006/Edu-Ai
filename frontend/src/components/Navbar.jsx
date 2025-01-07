import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { UserDataContext } from "../context/UserDataContext";
import { FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import useFetchSessionData from "../hooks/useFetchSessionData";
import service from "../appwrite/appwriteUserAuth";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { sessionCookie,updateSessionCookie } = useContext(UserDataContext);

  // navigator
  const navigate = useNavigate();

  // this below hook is used to fetch the session data and update the session so that the user sees the dashboard and other thing
  useFetchSessionData();

  const isActive = (path) => location.pathname === path;
  // console.log(location);

  const handleSignOut = async() => {
    // console.log("sign out clicked");
    await service.logout();
    updateSessionCookie("");
    navigate("/");
  };

  return (
    <Container maxW={"1280px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, orange.400, orange.200)"}
          bgClip={"text"}>
          <Link to={"/"}>Edu Ai 📚</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          {[
            {
              path: sessionCookie ? `/dashboard/${sessionCookie["$id"]}` : "#",
              label: "Dashboard",
              show: sessionCookie ? true : false,
            },
            { path: "/about", label: "About", show: true },
            {
              path: "/signUp",
              label: "Sign Up",
              show: sessionCookie ? false : true,
            },
            {
              path: "/signIn",
              label: "Sign In",
              show: sessionCookie ? false : true,
            },
          ].map((link) => (
            <Link to={link.path} key={link.path}>
              {link.show && (
                <Button
                  colorScheme={isActive(link.path) ? "orange" : "white"}
                  variant={isActive(link.path) ? "solid" : "ghost"}>
                  {link.label}
                </Button>
              )}
            </Link>
          ))}

          {sessionCookie && (
            <Button onClick={handleSignOut} aria-label="Toggle Color Mode">
              {<FaSignOutAlt />}
            </Button>
          )}

          <Button onClick={toggleColorMode} aria-label="Toggle Color Mode">
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
