import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:8080" });

//action types
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const LOGOUT = "LOGOUT";

//action creators
export const login = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const signup = (account) => {
  return {
    type: SIGNUP,
    account,
  };
};

//thunk creators
export const loginThunk = (username, password) => {
  return async (dispatch) => {
    try {
      const x = await instance.get("/api/users/login", {
        params: { username: username, password: password },
      });

      const user = x.data;

      if (user !== "invalid login") {
        dispatch(login(user));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const signupThunk = (formData) => {
  return async (dispatch) => {
    try {
      const x = await instance.post("/api/users/", { formData });
      const user = x.data
      dispatch(login(user));


      //axious post request
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log(action.user);
      return action.user;
    case LOGOUT:
      return {};
    case SIGNUP:
      return action.signup;
    default:
      return state;
  }
}
