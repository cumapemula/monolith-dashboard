"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserHistory, {
        as: "score",
        foreignKey: "user_id",
        sourceKey: "id",
      });
      this.hasOne(models.UserBiodata, {
        as: "bio",
        foreignKey: "user_id",
        sourceKey: "id",
      });
    }
    // encrypt
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    // register
    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({ username, password: encryptedPassword });
    };
    checkPassword = (password) => bcrypt.compareSync(password, this.password);
    // Authenticate login for admin role
    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username, role: 'admin' } });
        if (!user) return Promise.reject("Invalid username or password");
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Invalid username or password");
        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  Users.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Users",
      tableName: "users",
    }
  );
  return Users;
};
