const express = require("express");
const dbLogin = require("../db");
const ERROR = require("../constants/code");
const nodemailer = require("nodemailer");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { sort_property, sort_order } = req.query;
    let results = await dbLogin.getAllItemsType(sort_property, sort_order);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await dbLogin.updateItemType(payload);
    
    if (result.affectedRows === 1) {
      res.json({ success: true, message: "Item type updated successfully" });
    } else {
      res.status(400).json({ success: false, message: "Failed to update item type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while updating." });
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const payload = req.body;
    if (typeof payload.id_itype === "undefined") {
      payload.id_itype = null;
    }
    let results = await dbLogin.addItemType(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await dbLogin.deleteItemType(payload);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
module.exports = router;
