require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const todoRoutes = require("./routes/TodoRoutes");
const app = express();
const cors=require("cors");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


connectToDB();
app.use("/",todoRoutes);

module.exports = app;