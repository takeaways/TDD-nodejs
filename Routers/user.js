const express = require("express");
const userRouter = express.Router();

const controller = require("../Controller");

userRouter.get("/", controller.user.getUser);
userRouter.post("/", controller.user.createUser);
userRouter.get("/:id", controller.user.getUserById);
userRouter.put("/:id", controller.user.updateUser);
userRouter.delete("/:id", controller.user.deleteUser);



module.exports = userRouter;