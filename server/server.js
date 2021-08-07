const express = require("express");
const login = require("./routers/login");

const app = express();

app.use(express.json());

app.use("/admin/login", login);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server run on port: ${port}`);
});
