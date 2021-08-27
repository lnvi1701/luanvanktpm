const express = require("express");
const dbLogin = require("../db");
const ERROR = require("../constants/code");
const nodemailer = require("nodemailer");

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

router.post("/about-to-exprire", async (req, res, next) => {
  try {
    const payload = req.body;
    let results = await dbLogin.getByExpiryTime(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/mail-expiry-to-staff", async (req, res, next) => {
  try {
    const payload = req.body;
    const results = await dbLogin.getAllUsers();
    const listEmail = results.map((item) => item.email);
    const listPromise = listEmail.map((email) => {
      return sendEmailExpiryDevice(
        email,
        payload.html,
        payload.expiry_time,
        payload.stock_email,
        payload.stock_password
      );
    });
    Promise.all(listPromise)
      .then((values) => {
        res.json(values);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

const sendEmailExpiryDevice = (
  email,
  html,
  expiry_time,
  stock_email,
  stock_password
) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: stock_email,
        pass: stock_password,
      },
    });

    console.log(html);

    const mailOptions = {
      from: "Stock Manager",
      to: email,
      subject: "Một số thiết bị sắp hết hạn sử dụng",
      html: `<h4>Danh sách một số thiết bị sắp hết hạn sử dụng vào ngày mai: ${expiry_time}</h4>
      ${html}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(email);
      }
    });
  });
};

module.exports = router;
