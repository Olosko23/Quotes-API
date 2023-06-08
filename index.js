const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const Quote = require("./models/quotes");

const app = express();
const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URL;
app.use(cors());
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//DB Connection
mongoose
  .connect(URL)
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((error) => {
    console.log({ error });
  });

//Routes
app.get("/", (req, res) => {
  res.status(200).json("Welcome to the Quotes API");
});

/////////////GET ALL QUOTES
app.get("/quotes", async (req, res) => {
  try {
    const quote = await Quote.find({});
    res.status(200).json(quote);
  } catch (error) {
    console.log({ message: error.message });
  }
});

/////////////GET ONE QUOTE
app.get("/quotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    res.status(200).json(quote);
  } catch (error) {
    console.log({ message: error.message });
  }
});

/////////////POST QUOTES
app.post("/quotes", async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (error) {
    console.log({ message: error.message });
  }
});

//////////
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
