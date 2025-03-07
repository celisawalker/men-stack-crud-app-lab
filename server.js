const express = require("express");
const dotenv = require("dotenv");


const mongoose = require("mongoose");
// const Customer = require("./models/customer");
// const prompt = require('prompt-sync')();
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.get("/", (req, res) => {
    res.send("Site is working!")
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });