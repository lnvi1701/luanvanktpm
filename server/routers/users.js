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

    if (!payload.emails || !Array.isArray(payload.emails) || payload.emails.length === 0) {
      return res.json({ error: "error", message: "Không có địa chỉ email hợp lệ nào được cung cấp" });
    }

    // Send reset password emails to multiple recipients
    for (const email of payload.emails) {
      const auth = {
        user: payload.stock_email,
        pass: payload.stock_password,
      };
      sendResetPasswordEmail(email, password, auth);
    }

    // You can return a success message or response here
    res.json({ success: { message: "Mật khẩu đặt lại đẫ được gửi đến email thành công!" } });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

const sendResetPasswordEmail = (email, password, auth) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth,
  });

  const mailOptions = {
    from: "vib1906610@student.ctu.edu.vn",
    to: email,
    subject: "Đặt lại mật khẩu thành công",
    text: `Mật khẩu mới của bạn: ${password}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email đã được gửi đến " + email + ": " + info.response);
    }
  });
};

module.exports = router;
