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

//best way to get open bills for people added to pending complex split?

export const deleteBill = (id) => {
  return {
    type: DELETE_BILL,
    id
  };
};


export const fetchBillsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const billsArray = await instance.get(`api/bills/${userId}`);
      const b = billsArray.data;
      dispatch(setBills(b));
    } catch (error) {}
  };
};

export const fetchBillThunk = (userId, billName) => {
  return async (dispatch) => {
    try {
      const foundBill = await instance.get(`api/bills/${userId}/${billName}`);
      const b = foundBill.data;
      dispatch(setBill(b));
    } catch (error) {
      console.error(error);
    }
  };
};

//right now, the component gets the whole parsed bill & adds to it, vs 
export const updateParsedBillThunk = (userId, billName, parsedBill) => {
  return async (dispatch) => {
    try {
      await instance.put(`api/bills/${userId}/${billName}/parse`, {
        parsedBill: parsedBill
      });
      
      //shouldnt need updated bill
    } catch (error) {
      console.error(error);
    }
  };
};

export const completeBillThunk = (userId, billName) => {
  return async (dispatch) => {
    try {
      await instance.put(`api/bills/${userId}/${billName}/complete`, {
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
      //const data = newBill.data;
      
      //need to change this below
      //dispatch(data);
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
    case SET_BILL:
      return { ...state, bill: action.bill };
    default:
      return state;
  }
}
