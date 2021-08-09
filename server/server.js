const express = require("express");
const login = require("./routers/login");
const items = require("./routers/items");
const categories = require("./routers/categories");
const users = require("./routers/users");

const app = express();

app.use(express.json());

app.use("/admin/login", login);
app.use("/items", items);
app.use("/categories", categories);
app.use("/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server run on port: ${port}`);
});
