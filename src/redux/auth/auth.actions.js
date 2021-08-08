import { SET } from "./auth.types";

export const setAuth = (payload) => {
  console.log("from actions: ", payload);
  return {
    type: SET,
    payload,
  };
};
