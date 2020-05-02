const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage:'./db.sqlite',
    logging:false
});

module.exports = {
    user:require("./user")(sequelize, Sequelize),
    sequelize,
    Sequelize
};