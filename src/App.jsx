import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index.jsx";
import SubmitRecipe from "./pages/SubmitRecipe.jsx";

function App() {
  const [recipes, setRecipes] = useState([
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
  ]);

  const [ratings, setRatings] = useState([
    { recipeId: 0, rating: 4.5, count: 10 },
    { recipeId: 1, rating: 4.0, count: 8 },
    { recipeId: 2, rating: 3.5, count: 12 },
  ]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index recipes={recipes} ratings={ratings} setRatings={setRatings} />} />
        <Route path="/submit-recipe" element={<SubmitRecipe addRecipe={addRecipe} />} />
      </Routes>
    </Router>
  );
}

export default App;