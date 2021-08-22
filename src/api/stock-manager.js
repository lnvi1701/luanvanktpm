import axios from "axios";

const DEFAULT_TIMEOUT = 10000;
const BASE_URL = "/";

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
});

export const adminLogin = (email, password, isAdmin) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("admin/login", { email, password, isAdmin })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getItems = (orderby, sort_order) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`items?orderby=${orderby}&sort_order=${sort_order}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getItem = (id) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`items/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getItemsByType = (type_id) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`items/type/${type_id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getItemsType = (sortProperty, sortOrder) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`items-type?sort_property=${sortProperty}&sort_order=${sortOrder}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("categories")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("users")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStatuses = () => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("statuses")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStocks = () => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("stocks")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateItem = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("items/update", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addItem = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("items/add", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteItem = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("items/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addItemType = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("items-type/add", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateItemType = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("items-type/update", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteItemType = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("items-type/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addCategory = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("categories/add", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateCategory = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("categories/update", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteCategory = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("categories/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addUser = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("users/add", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateUser = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("users/update", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteUser = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("users/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPermissions = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("permissions")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStaffRequests = (sortProperty, sortOrder) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`staff-requests?orderby=${sortProperty}&sort_order=${sortOrder}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addStaffRequest = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("staff-requests/add", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
