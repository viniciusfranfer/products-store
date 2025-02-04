import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import { useState } from 'react';
import { useProductStore } from '../store/product.js';
import { Toaster, toaster } from "@/components/ui/toaster"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        type: "error"
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        type: "success",
      });
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }

  }

  return (
    <Container maxW={"lg"} py={12}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create new Product
        </Heading>
        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              bg={useColorModeValue("gray.100", "gray.700")}
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              bg={useColorModeValue("gray.100", "gray.700")}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              bg={useColorModeValue("gray.100", "gray.700")}
            />
            <Button colorScheme={'blue'} onClick={handleAddProduct} w={'full'}>
              Add Product
            </Button>
            <Toaster />
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage