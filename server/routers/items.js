const express = require("express");
const dbLogin = require("../db");
const ERROR = require("../constants/code");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { orderby, sort_order } = req.query;
    let results = await dbLogin.getAllItems(orderby, sort_order);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let results = await dbLogin.getItem(id);
    res.json(results[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/type/:type_id", async (req, res, next) => {
  try {
    const { type_id } = req.params;
    let results = await dbLogin.getItemByTypeId(type_id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const payload = req.body;
    let results = await dbLogin.updateItem(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const payload = req.body;
    let results = await dbLogin.addItem(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const payload = req.body;
    let results = await dbLogin.deleteItem(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
