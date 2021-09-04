let colorObj = {
  main: "#ED3B5B",
  secondary: "#3bedac",
  background: "white",
  bar: "pink",
  name: 'classic'
};

export const berry = ["#8202ad","#ad0282","white","gray","Purple Berry"]
export const classic = ['#ED3B5B',"#3bedac","white","pink","Classic"]
export const blue  = ["#3131cc","#7b3cba","white","gray","Blue"]
export const pinky = ["#ffa1ff","#d0ffa1","white","gray","pinky"]
export const baby = ["#ffb2d1","#b2f0ff","white","#fff0b2","baby"]
export const greens = ['#188556',"#184785","white","gray","green"]


export const setBerry = () => {
  setAllColors(berry)
}
export const setClassic = () => {
  setAllColors(classic)
}
export const setBlue = () => {
  setAllColors(blue)
}
export const setPinky = () => {
  setAllColors(pinky)
}
export const setBaby = () => {
  setAllColors(baby)
}
export const setGreens= () => {
  setAllColors(greens)
}


export const setMainColor = (color) => {
  if (color) colorObj.main = color;
};

export const setSecondaryColor = (color) => {
  if (color) colorObj.secondary = "color";
};

export const setBackGroundColor = (color) => {
  if (color) colorObj.background = color;
};
export const setBarColor = (color) => {
    if(color) colorObj.bar = color
}

export const setAllColors = (array) => {
  if (array[0]) colorObj.main = array[0];
  if (array[1]) colorObj.secondary = array[1];
  if (array[2]) colorObj.background = array[2];
  if (array[3]) colorObj.bar = array[3];
 if (array[4]) colorObj.name = array[4];
};

export default colorObj
