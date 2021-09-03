import axios from "axios";


import source from "../../source";
// const ApiKey = "cca55ddcec88957";

const SET_PARSED_BILL = "SET_BILL";
const SET_BILL = "SET_BILL";
const SET_BILLS = "SET_BILLS";
const DELETE_BILL = "DELETE_BILL"
const instance = axios.create({ baseURL: source });

const initialState = {
  parsedBill: {},
  bill: {},
  bills: [],
};

//action creators
export const setParsedBill = (parsedBill) => {
  return {
    type: SET_PARSED_BILL,
    parsedBill,
  };
};
export const setBill = (bill) => {
  return {
    type: SET_BILL,
    bill,
  };
};
export const setBills = (bills) => {
  return {
    type: SET_BILLS,
    bills,
  };
};
export const deleteBill = (id) => {
  return {
    type: DELETE_BILL,
    id
  };
};

//thunk creators
export const fetchBillsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const billsArray = await instance.get(`api/bills/${userId}`);
      const b = billsArray.data;
      dispatch(setBills(b));
    } catch (error) {}
  };
};

export const fetchBillThunk = (billId) => {
  return async (dispatch) => {
    try {
      const foundBill = await instance.get(`api/bills/${billId}/pk`);
      const b = foundBill.data;
      dispatch(setBill(b));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchParsedBillThunk = (billId) => {
  return async (dispatch) => {
    try {
      const parsedBill = await instance.get(`api/bills/${billId}/parse`);
      const pb = parsedBill.data;
      dispatch(setParsedBill(pb));
    } catch (error) {
      console.error(error);
    }
  };
};

//the component gets the whole parsed bill & adds to it 
export const updateParsedBillThunk = (billId, parsedBill) => {
  return async (dispatch) => {
    try {
      await instance.put(`api/bills/${billId}/parse`, {
        parsedBill: parsedBill
      });
      //shouldnt need updated bill
    } catch (error) {
      console.error(error);
    }
  };
};

export const completeBillThunk = (billId) => {
  return async (dispatch) => {
    try {
      await instance.put(`api/bills/${billId}/complete`, {
        complete: 'true'
      });
      
    } catch (error) {
      console.error(error);
    }
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
      const b = newBill.data;
      dispatch(setBill(b));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteTransactionThunk = (id) => {
  return async (dispatch) => {
    try {
      await instance.delete(`api/bills/${id}`);
      dispatch(deleteBill(id));

    } catch (error) {

    }
  };
};

//reducers
export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_BILL: 
      let bil = state.bills;
      bil = bil.filter((element) => {
        if(element.id !== action.id) return element;
      });
    return { ...state, bills: bil };
    case SET_BILLS:
      return { ...state, bills: action.bills };
    case SET_BILL:
      return { ...state, bill: action.bill };
    case SET_PARSED_BILL:
      return { ...state, parsedBill: action.parsedBill };
    default:
      return state;
  }
}
