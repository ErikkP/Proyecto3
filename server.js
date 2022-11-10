const express = require("express");
const app = express();


require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MONGODB_URL;

const discoRouter = require("./routes/discoRouter")

app.use(express.json({extended: true}));
app.use(express.urlencoded());

mongoose
  .connect(URL, {})
  .then(() => {
    console.log("BBDD is now connected");
  })
  .catch((error) => {
    console.log(error);
  });

// console.log("Hola")

app.use("/api", discoRouter)

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
