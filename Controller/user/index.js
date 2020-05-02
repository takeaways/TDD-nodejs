const User = require("../../Models").user;


//TODO: 모든 유저의 정보를 반환한다.
exports.getUser = async (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // "2" 문자형으로 들어 온다.

    if (Number.isNaN(limit)) return res.status(400).end();
    const users = await User.findAll({limit});
console.log(users)
    return res.json(users.slice(0, limit));
};

//TODO: 유저를 생성한다.
exports.createUser = async (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();
    const exist = await User.findOne(({
        where: {
            name
        }
    }));
    if (exist) return res.status(409).end();
    else {
        const user = await User.create({name});
        return res.status(201).json(user);
    }
};

//TODO: ID를 통한 유저 정보를 반환한다.
exports.getUserById = async (req, res) => {

    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const user = await User.findOne({where: {id}})
    if (!user) return res.status(404).end();

    res.json(user);
};

//TODO: ID를 통한 유저 정보를 업데이트한다.
exports.updateUser = async (req, res) => {

    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const user = await User.findOne({where: {id}});
    if (!user) return res.status(404).end();

    user.name = name;
    try {
        await user.save();
        return res.status(200).json(user);
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            return res.status(409).end();
        }


    }

};

//TODO: ID를 통한 유저정보를 삭제 한다.
exports.deleteUser = async (req, res) => {

    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const result = await User.destroy({where: {id}});
    res.status(204).end()
};

