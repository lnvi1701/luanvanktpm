import { SET, DELETE } from "./auth.types";

export const setAuth = (payload) => {
  return {
    type: SET,
    payload,
  };
};

export const logOut = () => {
  return {
    type: DELETE,
  };
};
