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
    console.log(payload);
    let results = await dbLogin.updateItemType(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const payload = req.body;
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
    let results = await dbLogin.deleteItemType(payload);
    res.json(results);
    // sendDeleteEmail();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// const sendDeleteEmail = () => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "plusight1@gmail.com",
//       pass: "Hung.965",
//     },
//   });

//   const mailOptions = {
//     from: "sktt1kennet@gmail.com",
//     to: "hungcan1998965@gmail.com",
//     subject: "Sending Email using Node.js",
//     text: "That was easy!",
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

module.exports = router;
