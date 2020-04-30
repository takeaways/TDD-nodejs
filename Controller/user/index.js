const lists = [{id: 1, name: "Hello"}, {id: 2, name: "World"}, {id: 3, name: "May"}];

//TODO: 모든 유저의 정보를 반환한다.
exports.getUser = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // "2" 문자형으로 들어 온다.

    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    return res.json(lists.slice(0, limit));
};

//TODO: 유저를 생성한다.
exports.createUser = (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    const exist = lists.find(u => u.name === name);
    if (exist) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    lists.push(user);
    res.status(201).json(user);

};

//TODO: ID를 통한 유저 정보를 반환한다.
exports.getUserById = (req, res) => {

    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const user = lists.filter(u => u.id === id)[0];
    if (!user) return res.status(404).end();

    res.json(user);
};

//TODO: ID를 통한 유저 정보를 업데이트한다.
exports.updateUser = (req, res) => {

    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if(!name) return res.status(400).end();

    const user = lists.find(u => u.id === id);
    if (!user) return res.status(404).end();

    const isConflick = lists.find(u => u.name === name);
    if(isConflick) return res.status(409).end();


    user.name = name;
    lists[id] = user;
    res.status(200).json(user);
};

//TODO: ID를 통한 유저정보를 삭제 한다.
exports.deleteUser = (req, res) => {

    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const users = lists.filter(u => u.id === id);
    res.status(204).end()
};

