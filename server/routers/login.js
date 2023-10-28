const express = require("express");
const dbLogin = require("../db");
const ERROR = require("../constants/code");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
      res.json({ error: ERROR.invalid });
      return;
    }

    const payload = {
      email,
      password,
    };

    let results = isAdmin
      ? await dbLogin.adminLogin(payload)
      : await dbLogin.userLogin(payload);

    if (!results.length) {
      res.json({ error: ERROR.incorect });
      return;
    }

    res.json({ ...results[0], isAdmin });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
