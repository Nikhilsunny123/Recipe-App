import express from "express";
import cors from "cors"; //communication bw frontend and backend
import mongoose from "mongoose"; //orm for mongodb

import { userRouter } from "./routes/user.js";
import { recipeRouter } from "./routes/recipes.js";

const app = express();
app.use(express.json()); //data from front end convert into json
app.use(cors()); //fix connection bw

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose.connect(
  "mongodb+srv://nikhil:admin1234@recipes.oakk6c9.mongodb.net/recipeapp?retryWrites=true&w=majority"
); //connection to our server

app.listen(3001, () => console.log("server started"));
