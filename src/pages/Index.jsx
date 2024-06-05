import { Container, Text, VStack, Heading, Box, Image, SimpleGrid, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const recipes = [
  {
    title: "Spaghetti Carbonara",
    image: "https://via.placeholder.com/150",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
  },
  {
    title: "Chicken Tikka Masala",
    image: "https://via.placeholder.com/150",
    description: "Chunks of roasted marinated chicken in a spiced curry sauce.",
  },
  {
    title: "Beef Stroganoff",
    image: "https://via.placeholder.com/150",
    description: "A Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).",
  },
];

const Rating = ({ recipeId, ratings, setRatings }) => {
  const [hover, setHover] = useState(null);

  const handleRating = (ratingValue) => {
    const newRatings = ratings.map((rating) => {
      if (rating.recipeId === recipeId) {
        const newCount = rating.count + 1;
        const newRating = (rating.rating * rating.count + ratingValue) / newCount;
        return { ...rating, rating: newRating, count: newCount };
      }
      return rating;
    });
    setRatings(newRatings);
  };

  const currentRating = ratings.find((rating) => rating.recipeId === recipeId)?.rating || 0;

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name={`rating-${recipeId}`}
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              style={{ display: "none" }}
            />
            <FaStar
              size={24}
              color={ratingValue <= (hover || currentRating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
          </label>
        );
      })}
      <Text>{currentRating.toFixed(1)} ({ratings.find((rating) => rating.recipeId === recipeId)?.count || 0} ratings)</Text>
    </div>
  );
};

const Index = ({ recipes }) => {
  const [ratings, setRatings] = useState(recipes.map((_, index) => ({ recipeId: index, rating: 0, count: 0 })));

  return (
    <Container centerContent maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Recipe Sharing Website</Heading>
        <Text fontSize="lg">Discover and share your favorite recipes!</Text>
        <Link to="/submit-recipe">
          <Button colorScheme="teal" size="lg">Submit Recipe</Button>
        </Link>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {recipes.map((recipe, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
              <Image src={recipe.image} alt={recipe.title} />
              <Box p={6}>
                <Heading as="h3" size="md" mb={2}>{recipe.title}</Heading>
                <Text>{recipe.description}</Text>
                <Rating recipeId={index} ratings={ratings} setRatings={setRatings} />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;