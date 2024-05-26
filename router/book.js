const express = require("express");

const { Book, Category, Author } = require("../SQL/models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const book = await Book.findAll({
      include: [
        { model: Author, as: "author" },
        { model: Category, as: "category" },
      ],
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ where: { id } });
    if (!book) return res.status(404).send("no book with given id");

    res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  const { title, published, authorId, categoryId } = req.body;

  try {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) return res.status(404).send("category not found");

    const author = await Author.findOne({ where: { id: authorId } });
    if (!author) return res.status(404).send("author not found");

    const book = await Book.create({
      title,
      published,
      authorId,
      categoryId,
    });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { title, published, authorId, categoryId } = req.body;
  const { id } = req.params;

  try {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) return res.status(404).send("category not found");

    const author = await Author.findOne({ where: { id: authorId } });
    if (!author) return res.status(404).send("author not found");

    const book = await Book.findOne({ where: { id } });
    if (!book) return res.status(404).send("no book with given id");

    book.title = title;
    book.published = published;
    book.categoryId = categoryId;
    book.authorId = authorId;

    book.save();

    res.status(200).json(book);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findOne({ where: { id } });
    if (!book) return res.status(404).send("no book with given id");

    book.destroy();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
