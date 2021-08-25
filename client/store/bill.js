// import axios from "axios";

// const ApiKey = "cca55ddcec88957";

// const SET_DATA = "SET_DATA";

// const initialState = {};

// const setData = (data) => {
//   return {
//     type: SET_DATA,
//     data,
//   };
// };

// export const sendPhotoThunk = (image) => {
//   return async (dispatch) => {
//     try {
//       const data = await axios.get(
//         `https://api.ocr.space/parse/imageurl?apikey=${ApiKey}&url=https://media-cdn.tripadvisor.com/media/photo-p/0e/54/47/43/receipt.jpg&isTable=true&OCREngine=2`
//       );

//       dispatch(setData(data.data));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case SET_DATA:
//       return action.data;
//     default:
//       return state;
//   }
// }
