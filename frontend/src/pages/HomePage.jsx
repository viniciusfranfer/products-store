import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // console.log("Products", products);
  

  return (
    <Container>
      <VStack padding={8}>
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgClip={"text"}
          color={"purple.400"}
          marginBottom={5}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={6}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
          No products found {" "}
          <Link to={"/create"}>
            <Text as={"span"} color={"purple.400"} fontWeight={"bold"} _hover={{ textDecoration: "underline" }}>
              Create a product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage