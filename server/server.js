const express = require("express");
const login = require("./routers/login");
const itemsType = require("./routers/itemsType");
const categories = require("./routers/categories");
const users = require("./routers/users");
const items = require("./routers/items");
const statuses = require("./routers/statuses");
const stocks = require("./routers/stocks");
const permissions = require("./routers/permissions");
const staffRequests = require("./routers/staff-request");
const { format } = require("date-fns");
const stockDB = require("./db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/admin/login", login);
app.use("/items", items);
app.use("/items-type", itemsType);
app.use("/categories", categories);
app.use("/users", users);
app.use("/statuses", statuses);
app.use("/stocks", stocks);
app.use("/permissions", permissions);
app.use("/staff-requests", staffRequests);

const port = process.env.PORT || 5000;

const DAY_DURATION = 1000 * 60 * 60 * 24;

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const sendExpiryItemsToStaff = async () => {
  const payload = {
    expiry_time: format(getTomorrow(), "yyyy-MM-dd"),
  };
  const items = await stockDB.getByExpiryTime(payload);
  const users = await stockDB.getAllUsers();

  if (!items.length || !users.length) return console.log("No items or users found");

  const emails = users.map((user) => user.email);

  const html = buildHtmlTable(items);

  const listPromise = emails.map((email) => {
    return sendEmailExpiryDevice(email, html, payload.expiry_time);
  });

  Promise.all(listPromise)
    .then((values) => {
      console.log(values);
    })
    .catch((error) => {
      console.log(error);
    });
};

const sendEmailExpiryDevice = (email, html, expiry_time) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EXPRESS_APP_STOCK_EMAIL,
        pass: process.env.EXPRESS_APP_STOCK_PASSWORD,
      },
    });

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

const getTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

const buildHtmlTable = (items) => {
  return `
  <table style="border: 1px solid black">
    <thead style="border: 1px solid black">
      <tr style="border: 1px solid black">
        <th scope="col">Mã thiết bị</th>
        <th scope="col">Tên thiết bị/th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Vị trí kho</th>
        <th scope="col">Ngày nhập</th>
        <th scope="col">Ngày hết hạn</th>
        <th scope="col">Mô tả</th>
      </tr>
    </thead>
    <tbody style="border: 1px solid black">
      ${items.map((item) => buildHtmlRow(item)).join("")}
    </tbody>
  </table>
  `;
};

const getDate = (stringDate) => {
  if (!stringDate) return "--";
  const cvDate = new Date(stringDate);
  return format(cvDate, "dd-MM-yyyy");
};

const buildHtmlRow = (row) => {
  return `
    <tr style="border: 1px solid black">
      <th role="cell" scope="row" style="border: 1px solid black; padding: 8px">
       ${row.id}
      </th>
      <td style="border: 1px solid black; padding: 8px">${row.name}</td>
      <td style="border: 1px solid black; padding: 8px">${row.status}</td>
      <td style="border: 1px solid black; padding: 8px">
       ${row.stock}
      </td>
      <td style="border: 1px solid black; padding: 8px">${getDate(
        row.input_time
      )}</td>
      <td style="border: 1px solid black; padding: 8px">${getDate(
        row.expiry_time
      )}</td>
      <td style="border: 1px solid black; padding: 8px">${row.description}</td>
    </tr>`;
};
setInterval(sendExpiryItemsToStaff, DAY_DURATION);