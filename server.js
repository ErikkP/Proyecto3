const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const URL = process.env.MONGODB_URL;


// const discoRouter = require("./routes/discoRouter")
const UserRouter = require("./routes/UserRouter")
const productRouter = require("./routes/productRouter")
const PaymentRouter = require("./routes/PaymentRouter")


app.use(express.json({extended: true}));
app.use(express.urlencoded());
app.use(fileUpload({
  useTempFiles: true,
}))
app.use(cors());


mongoose
  .connect(URL, {})
  .then(() => {
    console.log("BBDD is now connected");
  })
  .catch((error) => {
    console.log(error);
  });

// console.log("Hola")

// cloudinary
//  .connect(URL, {})
//   .then(() => {
//   console.log("CLOUDINARY is now connected");
//   })
//   .catch((error) => {
//   console.log(error);
// });


// app.use("/api", discoRouter)
app.use("/api", UserRouter)
app.use("/api", productRouter)
app.use("/api", PaymentRouter)
app.use("/api", require("./routes/FotoRouter"))

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
