const initialState = {
  test: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE_LATIHAN": {
      const incrementCounter = state.test + action.data;
      return {
        ...state,
        test: incrementCounter,
      };
    }
    case "DECREASE_LATIHAN": {
      const decrementCounter = state.test - 1;
      return {
        ...state,
        test: decrementCounter,
      };
    }

    case "RESET_LATIHAN": {
      return {
        ...state,
        test: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default counter;
