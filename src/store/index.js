import { createStore } from "vuex";

export default createStore({
  state: {
    navigation: [
      {
        title: "List1",
        open: false,
        complete: false,
        subnav: [
          { title: "Item1", clicked: false, quantity: 10, color: "#ff0000" },
          { title: "Item2", clicked: false, quantity: 11, color: "#ffbf00" },
          { title: "Item3", clicked: false, quantity: 12, color: "#00ff00" },
          { title: "Item4", clicked: false, quantity: 13, color: "#0000ff" },
        ],
      },
      {
        title: "List2",
        open: false,
        complete: false,
        subnav: [
          { title: "Item1", clicked: false, quantity: 14, color: "#ff0000" },
          { title: "Item2", clicked: false, quantity: 15, color: "#ffbf00" },
          { title: "Item3", clicked: false, quantity: 16, color: "#00ff00" },
          { title: "Item4", clicked: false, quantity: 17, color: "#0000ff" },
        ],
      },
      {
        title: "List3",
        open: false,
        complete: false,
        subnav: [
          { title: "Item1", clicked: false, quantity: 18, color: "#ff0000" },
          { title: "Item2", clicked: false, quantity: 19, color: "#ffbf00" },
          { title: "Item3", clicked: false, quantity: 20, color: "#00ff00" },
          { title: "Item4", clicked: false, quantity: 21, color: "#0000ff" },
        ],
      },
      {
        title: "List4",
        open: false,
        complete: false,
        subnav: [
          { title: "Item1", clicked: false, quantity: 22, color: "#ff0000" },
          { title: "Item2", clicked: false, quantity: 23, color: "#ffbf00" },
          { title: "Item3", clicked: false, quantity: 24, color: "#00ff00" },
          { title: "Item4", clicked: false, quantity: 25, color: "#0000ff" },
        ],
      },
      {
        title: "List5",
        open: false,
        complete: false,
        subnav: [
          { title: "Item1", clicked: false, quantity: 26, color: "#ff0000" },
          { title: "Item2", clicked: false, quantity: 27, color: "#ffbf00" },
          { title: "Item3", clicked: false, quantity: 28, color: "#00ff00" },
          { title: "Item4", clicked: false, quantity: 29, color: "#0000ff" },
        ],
      },
    ],
  },
  getters: {
    navigation: (state) => {
      return state.navigation;
    },
  },
  mutations: {
    toggleList(state, listIndex) {
      state.navigation[listIndex].open = !state.navigation[listIndex].open;
    },
    checkItem(state, { listIndex, itemIndex }) {
      state.navigation[listIndex].subnav[itemIndex].clicked =
        !state.navigation[listIndex].subnav[itemIndex].clicked;
      const list = state.navigation[listIndex];
      const allClicked = list.subnav.every((item) => item.clicked);
      list.complete = allClicked;
    },
    changeQuantity(state, { listIndex, itemIndex, newQuantity }) {
      state.navigation[listIndex].subnav[itemIndex].quantity = newQuantity;
    },
    changeColor(state, { listIndex, itemIndex, newColor }) {
      state.navigation[listIndex].subnav[itemIndex].color = newColor;
    },
    toggleItems(state, listIndex) {
      const list = state.navigation[listIndex];
      const allClicked = list.subnav.every((item) => item.clicked);
      list.subnav.forEach((item) => {
        item.clicked = !allClicked;
      });
      list.complete = !allClicked;
    },
  },
});
