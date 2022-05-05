const initState = {
  histories: [],
};

const historyReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD":
      let newState = Object.assign({}, state);
      newState["histories"] = [...action.payload];
      return newState;
    default:
      return state;
  }
};

export default historyReducer;
