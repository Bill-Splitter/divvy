import axios from "axios";

//action types
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";

//action creators
export const login = (user) => {
  return {
    type: LOGIN,
    user,
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
      console.log(username, password);

      //axious get requiest
    } catch (error) {
      console.error(error);
    }
  };
};


export const signupThunk = (formData) => {
  return async (dispatch) => {
    try {
      console.log(formData);

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
      return action.user;
    case SIGNUP:
      return action.signup;
    default:
      return state;
  }
}
