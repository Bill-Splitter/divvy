import axios from "axios";


import source from "../../source";
// const ApiKey = "cca55ddcec88957";

const SET_BILL = "SET_BILL";
const SET_BILLS = "SET_BILLS";
const DELETE_BILL = "DELETE_BILL"
const instance = axios.create({ baseURL: source });

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


//is best way to create bill with userID, then fetch bill and attach photo?

export const deleteBill = (id) => {
  return {
    type: DELETE_BILL,
    id
  }
}


export const fetchBillsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const billsArray = await instance.get(`api/bills/${userId}`);
      const b = billsArray.data;
      dispatch(setBills(b));
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

export const deleteTransactionThunk = (id) => {
  return async (dispatch) => {
    try {
      await instance.delete(`api/bills/${id}`)
      dispatch(deleteBill(id))

    } catch (error) {

    }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_BILL: 
    let bil = state.bills
    bil = bil.filter((element) => {
      if(element.id !== action.id) return element
    })
    return { ...state, bills: bil };
    case SET_BILLS:
      return { ...state, bills: action.bills };
    default:
      return state;
  }
}
