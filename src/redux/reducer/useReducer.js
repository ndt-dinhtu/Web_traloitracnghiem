import { INCREMENT, DECREMENT } from "../action/counterAction";
import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";
const INITIAL_STATE = {
  account: {
    username: "",
    access_token: "",
    refersh_token: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          username: action?.payload?.DT?.username,
          access_token: action?.payload?.DT?.access_token,
          refersh_token: action?.payload?.DT?.refersh_token,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        isAuthenticated: true,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default userReducer;
