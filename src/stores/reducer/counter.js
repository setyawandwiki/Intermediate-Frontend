const initialState = {
  count: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE": {
      const incrementCount = state.count + 1;
      return {
        ...state,
        count: incrementCount,
      };
    }
    default: {
      return state;
    }
  }
};

export default counter;
