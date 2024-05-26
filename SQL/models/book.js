"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    M;
    static associate({ Author, Category }) {
      // define association here
      this.belongsTo(Author, { foreignKey: "authorId", as: "author" });
      this.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
    }
    toJSON() {
      return {
        ...this.get(),
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "book must have a title" },
        },
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: { msg: "specify if published or not" },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "book must have a have an author" },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "book must have a category" },
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
    }
  );

  return Book;
};
