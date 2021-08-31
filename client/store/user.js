import axios from "axios";
import source from "../../source";
const instance = axios.create({ baseURL: source });

//action types
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const LOGOUT = "LOGOUT";
const UPDATE_USER = "UPDATE_USER";
const APPROVE_REQUEST = "APPROVE_REQUEST";
const DENY_REQUEST = "DENY_REQUEST";
const GET_USER_INFO = "GET_USER_INFO";
const DELETE_FRIEND = "DELETE_FRIEND";

//action creators
export const login = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

export const getUpdatedUserInfo = () => {
  return {
    type: GET_USER_INFO,
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

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const approveRequest = (user) => {
  return {
    type: APPROVE_REQUEST,
    user: user,
  };
};
export const denyRequest = (id) => {
  return {
    type: DENY_REQUEST,
    id,
  };
};
export const deleteFriend = (friendId) => {
  return {
    type: DELETE_FRIEND,
    id: friendId,
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

      if (user !== "error") {
        dispatch(login(user));
      } else {
        return "error";
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
      const user = x.data;
      console.log(user)

      if (user.error) {
        return user.error;
      } else {
        dispatch(login(user));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFriendThunk = (myId, friendId) => {
  return async (dispatch) => {
    try {
      await instance.delete("api/users/deleteFriend/", {
        data: {
          user1: myId,
          user2: friendId,
        },
      });

      dispatch(deleteFriend(friendId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const approveFriendRequest = (id, user) => {
  return async (dispatch) => {
    try {
      const returnedUser = await instance.post("api/users/approveRequest/", {
        sender: user,
        receiver: id,
      });
      const data = returnedUser.data;
      dispatch(approveRequest(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const denyFriendRequest = (id, user) => {
  return async (dispatch) => {
    try {
      await instance.delete("api/users/denyRequest/", {
        data: {
          sender: user,
          receiver: id,
        },
      });

      dispatch(denyRequest(id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const sendFriendRequest = (senderId, phoneNumber) => {
  return async (dispatch) => {
    try {
      let fren = await instance.post("/api/users/addFriend/", {
        senderId: senderId,
        phoneNumber: phoneNumber,
      });
      console.log("dasta", fren.data)

      if (fren.data === "user not found") {
        console.log("THIS IS NOT HERE")
        return "not found";
      } else {
        return fren.data.id
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateUserThunk = (userId, data) => {
  return async (dispatch) => {
    try {
      let user = await instance.put(`/api/users/${userId}`, { data: data });

      const updatedUser = user.data;

      dispatch(updateUser(updatedUser));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteSelfThunk = (userId) => {
  return async (dispatch) => {
    try {
      await instance.delete(`/api/users/${userId}`);
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.user;
    case LOGIN:
      return action.user;
    case LOGOUT:
      return {};
    case SIGNUP:
      return action.signup;
    case GET_USER_INFO:
      return state;
    case DELETE_FRIEND:
      let temp = state;
      temp.friend = temp.friend.filter((element) => {
        if (element.id != action.id) return element;
      });
      return temp;

    case APPROVE_REQUEST:
      const user = state;

      user.requestee = user.requestee.filter((element) => {
        if (element.id !== action.user.id) return element;
      });
      user.friend.push(action.user);
      return state;
    case DENY_REQUEST:
      const user2 = state;
      user2.requestee = user2.requestee.filter((element) => {
        if (element.id !== action.id) return element;
      });
      return state;
    default:
      return state;
  }
}
