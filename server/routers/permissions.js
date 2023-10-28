const express = require("express");
const dbLogin = require("../db");
const ERROR = require("../constants/code");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let results = await dbLogin.getAllPermissions();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
