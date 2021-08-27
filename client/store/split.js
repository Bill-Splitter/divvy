const initialState = {
  name: "",
  total: "",
  group: "",
  idArray: [],
};

import source from "../../source";

//action types
const SET_DATA = "SET_DATA";
const SET_GROUP = "SET_GROUP";

//action creator
export const setData = (name, total) => {
  return {
    type: SET_DATA,
    name,
    total,
  };
};
export const setGroup = (group, idArray) => {
  return {
    type: SET_GROUP,
    group,
    idArray,
  };
};

//reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, name: action.name, total: action.total };
    case SET_GROUP:
      return { ...state, group: action.group, idArray: action.idArray };
    default:
      return state;
  }
}
