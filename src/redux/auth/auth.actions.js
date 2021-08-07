import { SET } from "./auth.types";

export const setAuth = (payload) => {
  return {
    type: SET,
    payload,
  };
};
