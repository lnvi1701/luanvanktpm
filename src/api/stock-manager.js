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
