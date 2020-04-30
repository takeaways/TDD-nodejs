const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");



const app = express();
dotenv.config();

const ENV = process.env.NODE_ENV;

if(ENV!== "test"){
    app.use(morgan(ENV === "dev" ? "dev" : "combined"));
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

module.exports = app;