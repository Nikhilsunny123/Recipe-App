import express from "express";
import mongoose from "mongoose";

import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await RecipeModel.find({}); //find all of the documents
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body); //creating new document
  try {
    await recipe.save(); //creating data
    res.json(recipe);
  } catch (err) {
    return res.json({ message: err });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    return res.json({ message: err });
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
    console.log(res);
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

export { router as recipeRouter };
