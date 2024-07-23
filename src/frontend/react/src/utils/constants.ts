export const LEFT_PADDING = "20px";

let LEFT_WIDTH: string = "50vw";
let NAVBAR_HEIGHT: string = "50px";
let LIST_WIDTH: string = "18vw"; 

export const setLeftWidth = (width: string) => {
  LEFT_WIDTH = width;
};

export const setNavbarHeight = (height: string) => {
  NAVBAR_HEIGHT = height;
};

export const setListWidth = (width: string) => {
  LIST_WIDTH = width;
};

export { LEFT_WIDTH, NAVBAR_HEIGHT, LIST_WIDTH };
