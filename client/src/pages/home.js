import axios from "axios";
import { useEffect, useState } from "react";
import { GetUserID } from "../customHook/getUserID";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = GetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get("http://localhost:3001/recipes");

        setRecipes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
    fetchSavedRecipe(recipes._id);
  }, []);

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  const saveRecipe = async (recipeID) => {
    const value = { recipeID, userID };
    console.log(value);
    try {
      const res = await axios.put("http://localhost:3001/recipes", value, {
        headers: { authorization: cookies.access_token },
      });

      setSavedRecipes(res.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                disabled={isRecipeSaved(recipe._id)}
                onClick={() => saveRecipe(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "saved" : "save"}
              </button>
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

export default Home;
