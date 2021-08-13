import axios from "axios";

const DEFAULT_TIMEOUT = 10000;
const BASE_URL = "/";

const xebusInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
});

export const adminLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    xebusInstance
      .post("admin/login", { email, password })
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
    xebusInstance
      .get(`items?orderby=${orderby}&sort_order=${sort_order}`)
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
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
    xebusInstance
      .post("items-type/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
