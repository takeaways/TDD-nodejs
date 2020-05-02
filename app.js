const express = require("express");
const app = express();


const dotenv = require("dotenv");
dotenv.config();
const ENV = process.env.NODE_ENV;

require("./Middlewares")(app, ENV);



const router = require("./Routers");
//routers
app.use("/user", router.user);
app.use("/post", router.post);

//에러 전용 미들 웨어가 있다.
app.use((error, req, res, next) => {
    console.log(error)
});

module.exports = app;