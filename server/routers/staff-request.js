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

router.post("/approve-item", async (req, res, next) => {
  try {
    const payload = req.body;
    if (payload.request_status === "not_approved") {
      const request_not_approved = await dbLogin.approveRequest(payload);
      return res.json({ request_not_approved });
    }
    const item_results = await dbLogin.approveItem(payload);
    const request_results = await dbLogin.approveRequest(payload);
    res.json({ item_results, request_results });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
