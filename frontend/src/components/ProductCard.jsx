import { Box, Button, Flex, Heading, HStack, IconButton, Image, Input, Text, VStack } from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import Modal from "react-modal";
import { useState, useEffect } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const [updatedProduct, setupdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement('#root');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px',
      borderRadius: '10px',
      width: '30vw',
      height: 'full',
      maxWidth: '800px',
      maxHeight: '600px',
      backgroundColor: bgColor,
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        type: "success",
      });
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    if (!updatedProduct.id) {
      console.error("❌ Error: Product ID is undefined!");
      return;
    }
  
    const { success, message } = await updateProduct(
      updatedProduct.id,
      updatedProduct
    );
  
    if (!success) {
      toaster.create({
        id: `toast-${Date.now()}`, 
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        type: "error",
      });
    } else {
      toaster.create({
        id: `toast-${Date.now()}`,
        title: "Product Updated",
        description: message,
        status: "success",
        isClosable: true,
        type: "success",
      });
  
      setupdatedProduct((prev) => ({
        ...prev,
        id: prev.id || id,
      }));
  
      closeModal();
    }
  };

  useEffect(() => {
    if (product) {
      setupdatedProduct(product); 
    }
  }, [product]);
  
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack justifyContent={"flex-end"}>
          <IconButton
            backgroundColor={"blue.500"}
            color={"white"}
            onClick={() => openModal()}
          >
            <FiEdit />
          </IconButton>
          <IconButton
            backgroundColor={"red.600"}
            color={"white"}
            onClick={() => handleDeleteProduct(product.id)}
          >
            <RiDeleteBin5Line />
          </IconButton>
        </HStack>
      </Box>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Product Modal"
      >
        <VStack padding={4} bg={bgColor}>
          <Input
            placeholder='Name'
            name='name'
            value={updatedProduct.name}
            onChange={(e) => setupdatedProduct((prev) => ({
              ...prev, 
              name: e.target.value,
              id: prev.id || product.id,  
            }))}
            bg={useColorModeValue("gray.100", "gray.700")}
          />
          <Input
            placeholder='Price'
            name='price'
            type='number'
            value={updatedProduct.price}
            onChange={(e) => setupdatedProduct((prev) => ({
              ...prev, 
              price: e.target.value,
              id: prev.id || product.id, 
            }))}
            bg={useColorModeValue("gray.100", "gray.700")}
          />
          <Input
            placeholder='Image URL'
            name='image'
            value={updatedProduct.image}
            onChange={(e) => setupdatedProduct((prev) => ({
              ...prev, 
              image: e.target.value,
              id: prev.id || product.id, 
            }))}
            bg={useColorModeValue("gray.100", "gray.700")}
          />
          <Flex justifyContent={"space-evenly"} w={"full"} marginTop={4}>
            <Button w={'30%'} onClick={() => handleUpdateProduct(updatedProduct.id, updatedProduct)}>
              Edit Product
            </Button>
            <Button color={'white'} bg={'red'} onClick={closeModal} w={'30%'}>
              Cancel
            </Button>
          </Flex>
        </VStack>
      </Modal>
      <Toaster />
    </Box>
  );
};

export default ProductCard;
