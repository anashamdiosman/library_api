const express = require("express");

const { sequelize } = require("./SQL/models");

const bookRouter = require("./router/book");
const authorRouter = require("./router/author");
const categoryRouter = require("./router/category");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/categories", categoryRouter);

app.listen(3000, async () => {
  console.log("Up on http://localhost:3000");
  await sequelize.sync().then(() => console.log("connected to database"));
});
