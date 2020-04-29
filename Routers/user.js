const express = require("express");
const userRouter = express.Router();


const lists = [{ id: 1, name: "Hello" }, { id: 2, name: "Hello" }, { id: 3, name: "Hello" }]
userRouter.get("/", (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // "2" 문자형으로 들어 온다.


    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    return res.json(lists.slice(0, limit));
});

userRouter.get("/:id", (req, res) => {

    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const user = lists.filter(u => u.id === id)[0];
    if (!user) return res.status(404).end();

    res.json(user);
});

userRouter.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)){
        return res.status(400).end();
    }
    const users = lists.filter(u => u.id === id);


    res.status(204).end()

});


module.exports = userRouter;