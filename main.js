import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./backend/routes/todoRoutes.js";

const app = express();
const PORT = 8000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://mongo:27017/todo")
  .then(console.log("Connection successful!"));

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(express.static("public"));
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
