import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaRegPlusSquare } from "react-icons/fa";
import { useColorMode } from "./ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { FaCartShopping } from "react-icons/fa6";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          md: "row"
        }}
      >
        <Text
          fontSize={{ base: "xx-large", sm: "xx-large" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          color={"purple.400"}
        >
          <Flex alignItems={"center"}> 
            <Link to={"/"}>Product Store    </Link>       
            <FaCartShopping />
          </Flex>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button color={"white"} bg={"purple.400"} _hover={{ bg: "purple.500" }}>Create Product
              <FaRegPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <LuMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar