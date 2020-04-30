const app = require("./Middlewares");
const router = require("./Routers");

//routers
app.use("/user", router.user);
app.use("/post", router.post);

//에러 전용 미들 웨어가 있다.
app.use((error, req, res, next) => {
    console.log(error)
});

// app.listen(7000, () => {
//     console.log(`server start port 7000`);
// });

module.exports = app;