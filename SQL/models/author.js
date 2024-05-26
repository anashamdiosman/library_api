"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Book }) {
      // define association here
      this.hasMany(Book, { foreignKey: "authorId" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Author.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "user must have a name" },
          isInt: { msg: "user must not contain numbers" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "user must have an email" },
          isEmail: { msg: "email must be valid" },
        },
      },
    },
    {
      sequelize,
      modelName: "Author",
      tableName: "authors",
    }
  );
  return Author;
};
