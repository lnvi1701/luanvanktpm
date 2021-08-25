const express = require("express");
const dbLogin = require("../db");
const ERROR = require("../constants/code");
const nodemailer = require("nodemailer");
const generator = require("generate-password");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let results = await dbLogin.getAllUsers();
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
    let results = await dbLogin.updateUser(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const payload = req.body;
    let results = await dbLogin.addUser(payload);
    res.json(results);
  } catch (error) {
    if (error.sqlMessage)
      return res.json({ error: "error", message: error.sqlMessage });
    res.sendStatus(500);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const payload = req.body;
    let results = await dbLogin.deleteUser(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/reset-password", async (req, res, next) => {
  try {
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    const payload = req.body;
    let results = await dbLogin.resetPassword({ ...payload, password });
    sendResetPasswordEmail(payload.email, password);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

const sendResetPasswordEmail = (email, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "plusight1@gmail.com",
      pass: "Hung.965",
    },
  });

  const mailOptions = {
    from: "plusight1@gmail.com",
    to: email,
    subject: "reset password success",
    text: `password reset: ${password}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = router;
