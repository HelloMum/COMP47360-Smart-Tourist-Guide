export const LEFT_PADDING = "20px";

let LEFT_WIDTH: string = "50vw";
let NAVBAR_HEIGHT: string = "50px";

export const setLeftWidth = (width: string) => {
  LEFT_WIDTH = width;
};

export const setNavbarHeight = (height: string) => {
  NAVBAR_HEIGHT = height;
};

export { LEFT_WIDTH, NAVBAR_HEIGHT };
