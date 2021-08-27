import axios from "axios";

// const ApiKey = "cca55ddcec88957";

const SET_BILL = "SET_BILL";
const instance = axios.create({ baseURL: "http://localhost:8080" });

const initialState = {
  bill: {},
};

export const createBillThunk = (bill, userid, friends) => {
  console.log(userid, "thunk");
  return async (dispatch) => {
    try {
      const newBill = await instance.post("api/bills/", {
        bill: bill,
        userid: userid,
        friendArray: friends,
      });
      const data = newBill.data;
    } catch (error) {
      console.error(error);
    }
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
