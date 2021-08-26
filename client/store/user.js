import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:8080" });


//action types
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const LOGOUT = "LOGOUT";
const UPDATE_USER = "UPDATE_USER";
const APPROVE_REQUEST = "APPROVE_REQUEST";
const DENY_REQUEST = "DENY_REQUEST"

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

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const approveRequest = (user) => {
  return {
    type: APPROVE_REQUEST,
    user: user
  }
}
// export const denyRequest = () => {
//   return {
//     type: DENY_REQUEST
//   }
// }

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

export const approveFriendRequest = (id, user) => {
  return async (dispatch) => {
    try{
      console.log(id,user, "thunky")
      const returnedUser = await instance.post("api/users/approveRequest/", {
        sender: user,
        receiver: id
      })
      const data = (returnedUser.data)
      dispatch(approveRequest(data))

    }catch(error){
      console.error(error)
    }
  }
  
}

export const denyFriendRequest = (id,user) => {
  return async (dispatch) => {
    try{
      console.log(id,user, "thunky")
      const returnedUser = await instance.post("api/users/approveRequest/", {
        sender: user,
        receiver: id
      })
      console.log(returnedUser.data)

    }catch(error){
      console.error(error)
    }
  }


}

export const updateUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await instance.put(
        `/api/users/${user.id}`,
        user
      );
      dispatch(updateUser(updated));
    } catch (error) {
      console.error(error);
    }
  };
};

export const sendFriendRequest = (senderId, phoneNumber) => {
  console.log(senderId, phoneNumber, "is the input");
  return async (dispatch) => {
    try {
      await instance.post("/api/users/addFriend/", {
        senderId: senderId,
        phoneNumber: phoneNumber,
      });
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
    case LOGOUT:
      return {};
    case SIGNUP:
      return action.signup;
    case APPROVE_REQUEST:
      const user = state
 
      user.requestee = user.requestee.filter((element) => {
        if(element.id !== action.user.id) return element
      })
      user.friend.push(action.user)
      return state
    case DENY_REQUEST:
        return state
    default:
      return state;
  }
}
