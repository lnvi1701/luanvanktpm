const express = require("express");
const dbLogin = require("../db");
const ERROR = require("../constants/code");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { orderby, sort_order } = req.query;
    let results = await dbLogin.getAllStaffRequest(orderby, sort_order);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// router.post("/update", async (req, res, next) => {
//   try {
//     const payload = req.body;
//     let results = await dbLogin.updateItem(payload);
//     res.json(results);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

router.post("/add", async (req, res, next) => {
  try {
    const payload = req.body;
    console.log("pl: ", payload);
    let results = await dbLogin.addStaffRequest(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// router.post("/delete", async (req, res, next) => {
//   try {
//     const payload = req.body;
//     let results = await dbLogin.deleteItem(payload);
//     res.json(results);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

module.exports = router;
