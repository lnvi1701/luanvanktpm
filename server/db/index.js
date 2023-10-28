const mysql = require('mysql2/promise');
const generator = require("generate-password");
const moment = require('moment');
const bcrypt = require('bcrypt');

const mysqlPool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '170101',
  database: 'stock_database'
});

// Your stockDB object and other code remain unchanged

const stockDB = {};

stockDB.adminLogin = async ({ email, password }) => {
  try {
    const [rows, fields] = await mysqlPool.execute(
      'SELECT * FROM admins WHERE email = ? AND password = ?',
      [email, password]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      // Admin with matching email and password found
      console.log(rows); // In ra kết quả truy vấn
      return rows;
    } else {
      // Admin not found
      return null;
    }
  } catch (error) {
    throw error;
  }
};


// Define the userLogin function
stockDB.userLogin = async ({ email, password }) => {
  try {
    const [rows, fields] = await mysqlPool.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

stockDB.getAllItems = async (orderby, sort_order) => {
  try {
    const [rows, fields] = await mysqlPool.query(
      `SELECT i.id, it.name, 
              quality,
              input_time, 
              output_time, 
              expiry_time, 
              i.description,
              it.id AS type_id,
              s.name AS status, 
              s.id AS status_id,
              st.name AS stock, 
              st.id AS stock_id,
              stp.name AS stock_type, 
              stp.id AS stock_type_id
        FROM items i
        LEFT JOIN item_types it
          ON i.type = it.id
        LEFT JOIN statuses s
          ON i.status = s.id
        LEFT JOIN stocks st
          ON i.stock_id = st.id
        LEFT JOIN stock_types stp
          ON st.type = stp.id
        ORDER BY ${orderby} ${sort_order}`
    );

    if (!rows || rows.length === 0) {
      return []; 
    }

    return rows;
  } catch (error) {
    throw error;
  }
};

stockDB.getByExpiryTime = async ({ expiry_time }) => {
  try {
    const [rows, fields] = await mysqlPool.execute(
      `SELECT i.ID as id, 
              it.name, 
              i.INPUT_TIME as input_time, 
              i.OUTPUT_TIME as output_time, 
              i.EXPIRY_TIME as expiry_time, 
              i.DESCRIPTION as description,
              i.TYPE as type_id,
              s.name as status, 
              i.STATUS as status_id,
              st.name as stock, 
              i.STOCK_ID as stock_id,
              stp.name as stock_type, 
              st.ID as stock_type_id
        FROM items i
        LEFT JOIN item_types it
          ON i.TYPE = it.id
        LEFT JOIN statuses s
          ON i.STATUS = s.id
        LEFT JOIN stock_types st
          ON i.STOCK_ID = st.id
        LEFT JOIN stock_types stp
          ON st.ID = stp.id
        WHERE i.EXPIRY_TIME = ?`,
      [expiry_time]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};


stockDB.getItem = async (id) => {
  try {
    const [rows, fields] = await mysqlPool.execute(
      `SELECT i.id, 
              i.id_item,
              it.name, 
              input_time, 
              output_time, 
              expiry_time, 
              i.description,
              it.id AS type_id,
              it.id_itype AS id_item,
              s.name AS status, 
              s.id AS status_id,
              st.name AS stock, 
              st.id AS stock_id,
              stp.name AS stock_type, 
              stp.id AS stock_type_id
      FROM items i
      LEFT JOIN item_types it
        ON i.type = it.id
      LEFT JOIN statuses s
        ON i.status = s.id
      LEFT JOIN stocks st
        ON i.stock_id = st.id
      LEFT JOIN stock_types stp
        ON st.type = stp.id
      WHERE i.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    // Xử lý dữ liệu trả về
    const item = {
      ID: rows[0].ID,
      type: rows[0].TYPE,
      inputTime: rows[0].INPUT_TIME,
      expiryTime: rows[0].EXPIRY_TIME,
      status: rows[0].status,
      stock: rows[0].stock,
      quality: rows[0].quality,
      description: rows[0].DESCRIPTION,
      idItem: rows[0].id_item
    };

    return item;
  } catch (error) {
    throw error;
  }
};


stockDB.getItemByTypeId = async (id_itype) => {
  try {
    const [rows, fields] = await mysqlPool.execute(
      `SELECT i.ID as id, 
              it.name AS item_name, 
              it.unit AS item_unit, 
              i.INPUT_TIME as input_time, 
              i.OUTPUT_TIME as output_time, 
              i.EXPIRY_TIME as expiry_time, 
              i.DESCRIPTION as item_description,
              it.id AS type_id,
              i.quality,
              it.id_itype AS id_item,
              s.name AS status, 
              i.STATUS as status_id,
              st.name AS stock, 
              i.STOCK_ID as stock_id,
              stp.name AS stock_type, 
              st.ID as stock_type_id
        FROM items i
        JOIN item_types it 
          ON i.TYPE = it.name
        JOIN statuses s 
          ON i.STATUS = s.name
        JOIN stock_types st 
          ON i.STOCK_ID = st.name
        JOIN stock_types stp 
          ON st.ID = stp.id
        WHERE it.id = ?;`,
      [type_id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

stockDB.getAllItemsType = async (sort_property, sort_order) => {
  try {
    const orderByClause = sort_property ? `ORDER BY ${sort_property} ${sort_order}` : '';
    const sql = `
      SELECT
        it.id,
        it.name,
        UPPER(
          REGEXP_REPLACE(
            REPLACE(it.id_itype, ' ', ''),
            '[ÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ]', ''
          )
        ) AS id_itype,
        c.name AS category,
        c.id AS category_id,
        unit,
        it.description
      FROM
        item_types it
      LEFT JOIN
        categories c ON it.category = c.id
      ${orderByClause}
    `;
    const [rows, fields] = await mysqlPool.execute(sql);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy tất cả danh sách:', error);
    throw error;
  }
};


stockDB.getAllStaffRequest = async (sort_property, sort_order) => {
  try {
    console.log(sort_property, sort_order);
    const [rows, fields] = await mysqlPool.execute(
      `SELECT 
          sr.id, CONCAT(u.first_name," ",u.last_name) AS full_name, sr.staff_id,
          sr.date_time, sr.detail, sr.current_status AS current_status_id,
          sr.updated_status AS updated_status_id, sr.update_address, sr.status,
          sr.item_id, it.name, sr.current_stock, sr.updated_stock
        FROM staff_requests sr
        LEFT JOIN users u
          ON sr.staff_id = u.id
        LEFT JOIN items i
          ON sr.item_id = i.id
        LEFT JOIN item_types it
          ON i.type = it.id
        ORDER BY ${sort_property || ""} ${sort_order}`
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

stockDB.getAllCategories = async () => {
  try {
    const [rows, fields] = await mysqlPool.execute(`SELECT * FROM categories`);
    return rows;
  } catch (error) {
    throw error;
  }
};


stockDB.getStocks = async () => {
  try {
    const [rows, fields] = await mysqlPool.execute(`SELECT * FROM stocks`);
    return rows;
  } catch (error) {
    throw error;
  }
};


stockDB.getAllUsers = async () => {
  try {
    const [rows, fields] = await mysqlPool.execute(
      `SELECT u.id, first_name, last_name, CONCAT(first_name," ",last_name) AS full_name,
              email, p.name AS permission,
              p.id AS permission_id, u.status
        FROM users u
        LEFT JOIN permissions p
            ON u.permission = p.id`
    );
    return rows;
  } catch (error) {
    throw error;
  }
};


stockDB.getStatuses = async () => {
  try {
    const [rows, fields] = await mysqlPool.execute(`SELECT * FROM statuses`);
    return rows;
  } catch (error) {
    throw error;
  }
};

stockDB.updateItem = async ({
  id,
  type,
  input_time,
  output_time,
  expiry_time,
  status,
  stock_id,
  description,
  quality, // Thêm trường quality
  id_item, // Thêm trường id_item
}) => {
  try {
    const result = await mysqlPool.execute(
      `UPDATE items
        SET type = ?, input_time = ?, expiry_time = ?, output_time = ?, status = ?, stock_id = ?, description = ?, quality = ?, id_item = ?
        WHERE id = ?`,
      [type, input_time, expiry_time, output_time, status, stock_id, description, quality, id_item, id]
    );

    if (result.affectedRows === 1) {
      return {
        success: {
          message: "Cập nhật thành công",
        },
      };
    } else {
      return {
        error: {
          message: "Không tìm thấy danh mục hoặc không có thay đổi nào được thực hiện",
        },
      };
    }
  } catch (error) {
    console.error('Lỗi cập nhật danh mục:', error);
    throw error;
  }
};
stockDB.addItem = async ({
  type,
  quality, // Include the 'quality' field in the insert parameters
  input_time,
  output_time,
  expiry_time,
  status,
  stock_id,
  description,
}) => {
  try {
    const parameters = [
      type || null,
      quality || null,
      input_time || null,
      expiry_time || null,
      output_time || null,
      status || null,
      stock_id || null,
      description || null
    ];

    const [result] = await mysqlPool.execute(
      `INSERT INTO items (TYPE, quality, INPUT_TIME, EXPIRY_TIME, OUTPUT_TIME, STATUS, STOCK_ID, DESCRIPTION) 
      VALUES (?, ? , ? , ?, ?, ?, ?, ?)`,
      parameters
    );

    return {
      success: {
        message: 'Item added successfully',
      },
      insertedId: result.insertId,
    };
  } catch (error) {
    throw error;
  }
};

stockDB.addStaffRequest = async ({
  staff_id,
  date_time,
  item_id,
  detail,
  current_status,
  updated_status,
  updated_address,
  current_stock,
  updated_stock,
}) => {
  try {
    await mysqlPool.execute(
      `INSERT INTO staff_requests (staff_id, date_time, item_id, detail, current_status, updated_status, update_address, current_stock, updated_stock) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        staff_id,
        date_time,
        item_id,
        detail,
        current_status,
        updated_status,
        updated_address,
        current_stock,
        updated_stock,
      ]
    );

    return {
      success: {
        message: "Thêm thành công!",
      },
    };
  } catch (error) {
    console.error("Error occurred while adding staff request:", error);
    throw new Error("Failed to add staff request. Please try again later.");
  }
};

stockDB.deleteItem = async ({ id }) => {
  try {
    await mysqlPool.execute(`DELETE FROM items WHERE id = ?`, [id]);

    return {
      success: {
        message: "Xóa thành công!",
      },
    };
  } catch (error) {
    throw error;
  }
};

stockDB.addItemType = async ({ name, category, unit, description, id_itype }) => {
   const processedIdItype = id_itype
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toUpperCase();

  try {
     const [existingItemtype] = await mysqlPool.execute(
      'SELECT id_itype FROM item_types WHERE id_itype = ?',
      [processedIdItype]
    );

    if (existingItemtype.length > 0) {
      // Return an error response indicating that the id_categori already exists
      return {
        error: {
          message: "Item_type with the same id_itype already exists.",
        },
      };
    }
    const [result] = await mysqlPool.execute(
      `INSERT INTO item_types (name, category, unit, description, id_itype)
        VALUES (?, ?, ?, ?, ?)`,
      [name, category, unit, description, processedIdItype]
    );

    return {
      success: {
        message: 'Thêm loại thiết bị thành công!',
      },
      insertedId: result.insertId,
    };
  } catch (error) {
    throw error;
  }
};

stockDB.updateItemType = async (data) => {
  const { id, name, category, unit, description } = data;

  const sql = `
    UPDATE item_types
    SET name = ?, category = ?, unit = ?, description = ?
    WHERE id = ?;
  `;

  try {
    const [rows] = await mysqlPool.execute(sql, [name, category, unit, description, id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

stockDB.deleteItemType = async ({ id }) => {
  try {
    const sql = `DELETE FROM item_types WHERE id = ?`
    await mysqlPool.execute(`DELETE FROM item_types WHERE id = ?`, [id]);

    return {
      success: {
        message: "Xóa thành công!",
      },
    };
  } catch (error) {
    console.error('Lỗi khi xóa phân loại thiết bị:', error);
    throw error;
  }
};

stockDB.updateCategory = async ({ id, name, description }) => {
  try {
    const [result] = await mysqlPool.execute(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );

    if (result.affectedRows === 1) {
      return {
        success: {
          message: 'Category updated successfully',
        },
      };
    } else {
      return {
        success: {
          message: 'Category not found or no changes made',
        },
      };
    }
  } catch (error) {
    console.error('Error in updateCategory:', error);
    throw error;
  }
};

stockDB.addCategory = async ({ name, description, id_categori }) => {
  const processedIdCategori = id_categori
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toUpperCase();

  try {
    // Check if the id_categori already exists in the database
    const [existingCategory] = await mysqlPool.execute(
      'SELECT id_categori FROM categories WHERE id_categori = ?',
      [processedIdCategori]
    );

    if (existingCategory.length > 0) {
      // Return an error response indicating that the id_categori already exists
      return {
        error: {
          message: "Category with the same id_categori already exists.",
        },
      };
    }

    // If the id_categori doesn't exist, insert the new category
    const [result] = await mysqlPool.execute(
      `INSERT INTO categories (name, description, id_categori) 
        VALUES (?, ?, ?)`,
      [name, description, processedIdCategori]
    );

    return {
      success: {
        message: "Category added successfully",
      },
      insertedId: result.insertId,
    };
  } catch (error) {
    throw error;
  }
};


stockDB.deleteCategory = async ({ id }) => {
  try {
    const sql = `DELETE FROM categories WHERE id = ?`;
    await mysqlPool.execute(`DELETE FROM categories WHERE id = ?`, [id]);
    return {
      success: {
        message: "Category deleted successfully",
      },
    };
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    throw error;
  }
};

stockDB.addUser = async ({
  email,
  password,
  first_name,
  last_name,
  permission,
  status,
}) => {
  try {
    const [result] = await mysqlPool.execute(
      `INSERT INTO users (email, password, first_name, last_name, permission, status) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [email, password, first_name, last_name, permission, status]
    );

    return {
      success: {
        message: "User added successfully",
      },
      insertedId: result.insertId,
    };
  } catch (error) {
    throw error;
  }
};

stockDB.updateUser = async ({
  id,
  email,
  first_name,
  last_name,
  permission,
  status,
}) => {
  try {
    const result = await mysqlPool.execute(
      `UPDATE users
              SET email = ?, first_name = ?, last_name = ?, permission = ?, status = ?
              WHERE id = ?`,
      [email, first_name, last_name, permission, status, id]
    );

    return {
      success: {
        message: "User updated successfully",
      },
    };
  } catch (error) {
    throw error;
  }
};

stockDB.resetPassword = async ({ id }) => {
  try {
    const newPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Make sure to import and set up bcrypt

    const result = await mysqlPool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );

    return {
      success: {
        message: 'Password reset successfully',
      },
      newPassword: newPassword,
    };
  } catch (error) {
    throw error;
  }
};

stockDB.deleteUser = async ({ id }) => {
  try {
    const result = await mysqlPool.execute(`DELETE FROM users WHERE id = ?`, [id]);

    return {
      success: {
        message: "Xóa tài khoản thành công!",
      },
    };
  } catch (error) {
    throw error;
  }
};

stockDB.getAllPermissions = async () => {
  try {
    const [rows, fields] = await mysqlPool.execute(`SELECT * FROM permissions`);
    return rows;
  } catch (error) {
    throw error;
  }
};


stockDB.approveItem = async ({ item_id, item_status, output_time, stock_id }) => {
  try {
    const [result] = await mysqlPool.execute(
      `UPDATE items
        SET output_time = ?, status = ?, stock_id = ?
        WHERE id = ?`,
      [output_time, item_status, stock_id, item_id]
    );

    return result;
  } catch (error) {
    throw error;
  }
};

stockDB.approveRequest = async ({ request_id, request_status }) => {
  try {
    const [result] = await mysqlPool.execute(
      `UPDATE staff_requests
        SET status = ?
        WHERE id = ?`,
      [request_status, request_id]
    );

    return result;
  } catch (error) {
    throw error;
  }
};


stockDB.getOverallStatistics = async () => {
  try {
    const [totalItems] = await mysqlPool.execute('SELECT COUNT(*) as total_items FROM items');
    const [totalUsers] = await mysqlPool.execute('SELECT COUNT(*) as total_users FROM users');
    const [totalCategories] = await mysqlPool.execute('SELECT COUNT(*) as total_categories FROM categories');

    const overallStatistics = {
      totalItems: totalItems[0].total_items,
      totalUsers: totalUsers[0].total_users,
      totalCategories: totalCategories[0].total_categories
    };

    return overallStatistics;
  } catch (error) {
    throw error;
  }
};

stockDB.getCategoryStatistics = async () => {
  try {
    const [categoryStats] = await mysqlPool.execute(`
      SELECT c.name as category_name, COUNT(*) as item_count
      FROM items i
      JOIN item_types it ON i.type = it.id
      JOIN categories c ON it.category = c.id
      GROUP BY c.name
    `);

    return categoryStats;
  } catch (error) {
    throw error;
  }
};

stockDB.getUserStatistics = async () => {
  try {
    const [userStats] = await mysqlPool.execute(`
      SELECT p.name as permission, COUNT(*) as user_count
      FROM users u
      JOIN permissions p ON u.permission = p.id
      GROUP BY p.name
    `);

    return userStats;
  } catch (error) {
    throw error;
  }
};

module.exports = stockDB;
