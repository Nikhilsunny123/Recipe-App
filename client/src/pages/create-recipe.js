import React, { useState } from "react";
import axios from "axios";
import { GetUserID } from "../customHook/getUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const userID = GetUserID();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instrcutions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const parsedValue = name === "cookingTime" ? parseInt(value) : value;
    setRecipe({ ...recipe, [name]: parsedValue });
  };

  const handleIngreiantChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngrediant = (e) => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipe);
    try {
      const res = await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      console.log(res);
      alert("recipe created");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          // value={username}
          name="name"
          onChange={handleChange}
        ></input>

        <label htmlFor="ingredients">ingredients</label>
        <button name="" type="button" onClick={addIngrediant}>
          add ingredient
        </button>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            id="ingredients"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngreiantChange(e, idx)}
          />
        ))}

        <label htmlFor="instrcutions">instrcutions</label>
        <textarea
          type="text"
          id="instrcutions"
          name="instrcutions"
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        ></input>
        <label htmlFor="cookingTime">CookingTime</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        ></input>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
