const express = require("express");

const { Author, Book } = require("../SQL/models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const author = await Author.findAll();

    res.status(200).json(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findOne({ where: { id } });
    if (!author) return res.status(404).send("no author with given id");

    res.status(200).json(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const author = await Author.create({ name, email });

    res.status(200).json(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    const author = await Author.findOne({ where: { id } });
    if (!author) return res.status(404).send("no author with given id");

    author.name = name;
    author.email = email;

    author.save();

    res.status(200).json(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const author = await Author.findOne({ where: { id } });
    if (!author) return res.status(404).send("no author with given id");

    const book = await Book.findOne({ where: { authorId: author.id } });
    if (book) return res.status(401).send("cannot delete author");

    author.destroy();

    res.status(200).send("author deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
