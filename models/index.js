"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Users = require("./users")(sequelize, Sequelize.DataTypes);
const Games = require("./games")(sequelize, Sequelize.DataTypes);
const UserHistory = require("./userhistory")(sequelize, Sequelize.DataTypes);
const UserBiodata = require("./userbiodata")(sequelize, Sequelize.DataTypes);

UserHistory.hasMany(Games, {
  as: "games",
  foreignKey: "id",
  sourceKey: "game_id",
});
Users.hasMany(UserHistory, {
  as: "score",
  foreignKey: "user_id",
  sourceKey: "id",
});
Users.hasOne(UserBiodata, {
  as: "bio",
  foreignKey: "user_id",
  sourceKey: "id",
});

module.exports = {
  db,
  Users,
  Games,
  UserHistory,
  UserBiodata,
};
