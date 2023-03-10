import axios from "axios";
import { useEffect, useState } from "react";
import { GetUserID } from "../customHook/getUserID";

const SavedRecipes = () => {
  const [savedrecipes, setSavedRecipes] = useState([]);

  const userID = GetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipe();
  }, []);
  console.log(savedrecipes);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {savedrecipes?.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} />
            <p>Cooking time :{recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;
