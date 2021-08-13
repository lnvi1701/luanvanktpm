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

stockDB.getAllItems = (orderby, sort_order) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT i.id, it.name, input_time, output_time, expiry_time, i.description,
              it.id AS type_id,
              s.name AS status, s.id AS status_id,
              st.name AS stock, st.id AS stock_id,
              stp.name AS stock_type, stp.id AS stock_type_id
        FROM items i
        LEFT JOIN item_types it
          ON i.type = it.id
        LEFT JOIN statuses s
          ON i.status = s.id
        LEFT JOIN stocks st
          ON i.stock_id = st.id
        LEFT JOIN stock_types stp
          ON st.type = stp.id
        ORDER BY ${orderby} ${sort_order}`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

stockDB.getAllItemsType = (sort_property, sort_order) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT it.id,it.name, c.name AS category,c.id AS category_id,unit,it.description
        FROM item_types it 
		    LEFT JOIN categories c 
			    ON it.category = c.id
        ORDER BY ${sort_property || ""} ${sort_order}`,
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

stockDB.getStocks = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM stocks`, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

stockDB.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT u.id, first_name, last_name, CONCAT(first_name," ",last_name) AS full_name,
              email, p.name AS permission,
              p.id AS permission_id
        FROM users u
        LEFT JOIN permissions p
            ON u.permission = p.id`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

stockDB.getStatuses = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM statuses`, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

stockDB.updateItem = ({
  id,
  type,
  input_time,
  output_time,
  expiry_time,
  status,
  stock_id,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE items
              SET type = ?, input_time = ?,expiry_time = ?, output_time = ?, status = ?, stock_id = ?, description = ?
              WHERE id = ?`,
      [
        type,
        input_time,
        expiry_time,
        output_time,
        status,
        stock_id,
        description,
        id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          success: {
            message: "update success",
          },
        });
      }
    );
  });
};

stockDB.addItem = ({
  type,
  input_time,
  output_time,
  expiry_time,
  status,
  stock_id,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO items (type, input_time, expiry_time, output_time, status, stock_id, description) 
        VALUES (?, ? , ? , ?, ?, ?, ?)`,
      [
        type,
        input_time,
        expiry_time,
        output_time,
        status,
        stock_id,
        description,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          success: {
            message: "update success",
          },
        });
      }
    );
  });
};

stockDB.deleteItem = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM items WHERE id = ?`, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        success: {
          message: "delete success",
        },
      });
    });
  });
};

stockDB.addItemType = ({ name, category, unit, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO item_types (name, category, unit, description) 
        VALUES (?, ? , ? , ?)`,
      [name, category, unit, description],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          success: {
            message: "add success",
          },
        });
      }
    );
  });
};

stockDB.updateItemType = ({ id, name, category, unit, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE item_types
              SET name = ?, category = ?, unit = ?, description = ?
              WHERE id = ?`,
      [name, category, unit, description, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          success: {
            message: "update success",
          },
        });
      }
    );
  });
};

module.exports = stockDB;
