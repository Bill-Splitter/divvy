import axios from "axios";

const ApiKey = "cca55ddcec88957";

const SET_DATA = "SET_DATA";

const initialState = {};

const setData = (data) => {
  return {
    type: SET_DATA,
    data,
  };
};

export const sendPhotoThunk = (image) => {
  return async (dispatch) => {
    try {
      const data = await axios.get(
        `https://api.ocr.space/parse/imageurl?apikey=${ApiKey}&url=https://thumbs.dreamstime.com/z/shop-receipt-template-vector-sticker-100021139.jpg`
      );

      dispatch(setData(data.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function (state = initialState, action) {
  console.log(action, "this is the action");
  switch (action.type) {
    case SET_DATA:
      console.log("===================SETTING DATA");
      return action.data;
    default:
      return state;
  }
}
