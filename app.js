const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const ENV = process.env.NODE_ENV;

//routers
const userRouter = require("./Routers/user");
app.use(morgan(ENV === "dev" ? "dev" : "combined"));

app.use("/user", userRouter);

//에러 전용 미들 웨어가 있다.
app.use((error, req, res, next) => {
    console.log(error)
});

app.listen(7000, () => {
    console.log(`server start port 7000`);
})

module.exports = app;