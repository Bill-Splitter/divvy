import axios from "axios";

// const ApiKey = "cca55ddcec88957";

const SET_BILL = "SET_BILL";
const SET_BILLS = "SET_BILLS";
const instance = axios.create({ baseURL: "http://localhost:8080" });

const initialState = {
  bill: {},
  bills: [],
};

export const setBills = (bills) => {
  return {
    type: SET_BILLS,
    bills,
  };
};

export const fetchBillsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const billsArray = await instance.get(`api/bills/${userId}`);
      billsArray = billsArray.data;
      dispatch(setBills(billsArray));
    } catch (error) {}
  };
};

export const createBillThunk = (bill, userid, friends) => {
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
    case SET_BILLS:
      return { ...state, bills: action.bills };
    default:
      return state;
  }
}
