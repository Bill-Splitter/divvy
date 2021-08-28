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
const DELETE_FRIEND = "DELETE_FRIEND"


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
    id
  }
}
export const deleteFriend = (friendId) => {
  return {
    type: DELETE_FRIEND,
    id: friendId
  }
}

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
      const user = x.data;
      dispatch(login(user));

      //axious post request
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFriendThunk = (myId, friendId) => {
  return async(dispatch) => {
    try {
      console.log("friend", friendId, myId)
      await instance.delete("api/users/deleteFriend/", {
        data: {
          user1: myId,
          user2: friendId,
        },
      });

      dispatch(deleteFriend(friendId))

    } catch(error){
      console.error(error)
    }
  }
}

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

      dispatch(denyRequest(id))
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

      if(fren.data === "not found"){
        console.error("not found")
        throw "error"
      }
    } catch (error) {
      console.error(error);
    }
  };
};


export const updateUserThunk = (data, userId) => {
  return async(dispatch) => {
    try {

      let user = await instance.put(`/api/users/${userId}/`, {data})
      console.log(user.data.id, "id")

    } catch(error) {
      console.error(error)
    }
  }
}

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return {};
    case SIGNUP:
      return action.signup;
    case GET_USER_INFO:
      return state;
    case DELETE_FRIEND:
      let temp = state
      temp.friend = temp.friend.filter((element) => {
        if(element.id != action.id) return element
      })
      return temp

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
