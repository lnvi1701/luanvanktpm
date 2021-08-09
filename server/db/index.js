const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "password",
  user: "root",
  database: "stock-manager",
  host: "localhost",
  port: "3306",
});

let stockDB = {};

stockDB.adminLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM admins WHERE email = ? AND password = ?`,
      [email, password],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

stockDB.getAllItems = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT it.id,it.name, c.name AS category,c.id AS category_id,unit,it.description
        FROM item_types it 
		    LEFT JOIN categories c 
			    ON it.category = c.id;`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

stockDB.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM categories`, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

module.exports = stockDB;
