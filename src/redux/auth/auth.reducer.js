import { SET, DELETE } from "./auth.types";

const session = sessionStorage.getItem("user");

const INITIAL_STATE = () => {
  if (session) {
    return {
      user: JSON.parse(session),
    };
  }
  return {
    user: null,
  };
};

const reducer = (state = INITIAL_STATE(), action) => {
  switch (action.type) {
    case SET: {
      const user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user: action.payload,
      };
    }

    case DELETE: {
      sessionStorage.removeItem("user");
      console.log(session);
      return {
        ...state,
        user: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
