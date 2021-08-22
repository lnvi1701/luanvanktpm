const express = require("express");
const login = require("./routers/login");
const itemsType = require("./routers/itemsType");
const categories = require("./routers/categories");
const users = require("./routers/users");
const items = require("./routers/items");
const statuses = require("./routers/statuses");
const stocks = require("./routers/stocks");
const permissions = require("./routers/permissions");
const staffRequests = require("./routers/staff-request");

const app = express();

app.use(express.json());

app.use("/admin/login", login);
app.use("/items", items);
app.use("/items-type", itemsType);
app.use("/categories", categories);
app.use("/users", users);
app.use("/statuses", statuses);
app.use("/stocks", stocks);
app.use("/permissions", permissions);
app.use("/staff-requests", staffRequests);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server run on port: ${port}`);
});
