import { useState } from "react";
import { Container, VStack, Heading, FormControl, FormLabel, Input, Button, Textarea, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SubmitRecipe = ({ addRecipe }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && image && description) {
      addRecipe({ title, image, description });
      toast({
        title: "Recipe submitted.",
        description: "Your recipe has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "Error.",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} as="form" onSubmit={handleSubmit}>
        <Heading as="h1" size="2xl">Submit Your Recipe</Heading>
        <FormControl id="title" isRequired>
          <FormLabel>Recipe Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="image" isRequired>
          <FormLabel>Image URL</FormLabel>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" size="lg" type="submit">Submit Recipe</Button>
      </VStack>
    </Container>
  );
};

export default SubmitRecipe;