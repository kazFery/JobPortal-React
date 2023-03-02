const config = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, DataTypes);
db.posting = require("./postingModel.js")(sequelize, Sequelize);
db.apply = require("./applyModel.js")(sequelize, Sequelize);

db.user.hasMany(db.posting, { foreignKey: "ownerId" });
db.posting.belongsTo(db.user, { foreignKey: "ownerId" });

db.user.hasMany(db.apply, { foreignKey: "user_id" });
db.apply.belongsTo(db.user, { foreignKey: "user_id" });

db.posting.hasMany(db.apply, { foreignKey: "posting_id" });
db.apply.belongsTo(db.posting, { foreignKey: "posting_id" });

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync is done!");
});

module.exports = db;
