const models = require("../Models");
module.exports = () => models.sequelize.sync({force:true});
