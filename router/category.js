const express = require("express");

const { Category, Book } = require("../SQL/models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ where: { id } });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const category = await Category.findOne({ where: { id } });
    if (!category) return res.status(404).send("no category with given id");

    category.name = name;

    category.save();

    res.status(200).json(category);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ where: { id } });
    if (!category) return res.status(404).send("no category with given id");

    const book = await Book.findOne({ where: { categoryId: category.id } });
    if (book) return res.status(401).send("cannot delete category");

    category.destroy();

    res.status(200).send("category deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
