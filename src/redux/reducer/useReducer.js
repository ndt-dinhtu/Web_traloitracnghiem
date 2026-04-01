import { FETCH_USER_LOGIN_SUCCESS, USER_DO_LOGOUT } from "../action/userAction";
const INITIAL_STATE = {
  account: {
    username: "",
    access_token: "",
    refresh_token: "",
    image: "",
    role: "",
    email: "",
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
          refresh_token: action?.payload?.DT?.refresh_token,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
          email: action?.payload?.DT?.email,
        },
        isAuthenticated: true,
      };

    case USER_DO_LOGOUT:
      return {
        ...state,
        account: {
          username: "",
          access_token: "",
          refresh_token: "",
          image: "",
          role: "",
          email: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
