const initialState = {
  data: [],
  all: [],
  isLoading: false,
  isError: false,
  message: "",
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_BOOKING_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        data: [],
      };
    }
    case "CREATE_BOOKING_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: state.data.concat(action.payload.data.data),
        message: action.payload.data.msg,
      };
    }
    case "CREATE_BOOKING_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [],
        message: action.payload.data.msg,
      };
    }
    case "GET_BOOKING_BY_USER_ID_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        data: [],
      };
    }
    case "GET_BOOKING_BY_USER_ID_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "GET_BOOKING_BY_USER_ID_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [],
        message: action.payload.message,
      };
    }
    case "GET_ALL_BOOKING_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        data: action.payload.data.data,
        all: [],
      };
    }
    case "GET_ALL_BOOKING_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        all: action.payload.data.data,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "GET_ALL_BOOKING_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        all: action.payload.data.message,
        message: action.payload.message,
        data: [],
      };
    }
    default:
      return state;
  }
};

export default booking;
