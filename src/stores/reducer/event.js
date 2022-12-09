const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  message: "",
};

const event = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_MESSAGE": {
      return {
        ...state,
        message: "",
      };
    }
    case "GET_DATA_EVENT_PENDING": {
      return {
        ...state,
        data: [],
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "GET_DATA_EVENT_FULFILLED": {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        isError: false,
      };
    }
    case "GET_DATA_EVENT_REJECTED": {
      return {
        ...state,
        data: [],
        isLoading: false,
        isError: true,
        message: action.payload.data.msg,
      };
    }
    case "CREATE_EVENT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "CREATE_EVENT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
      };
    }
    case "CREATE_EVENT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_EVENT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "UPDATE_EVENT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_EVENT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.data.msg,
      };
    }
    case "DELETE_EVENT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "DELETE_EVENT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
      };
    }
    case "DELETE_EVENT_REJECTED": {
      console.log(action);
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.message,
      };
    }
    case "GET_EVENT_BY_ID_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "GET_EVENT_BY_ID_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
        data: action.payload.data.data,
      };
    }
    case "GET_EVENT_BY_ID_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.data.msg,
      };
    }
    case "GET_ALL_EVENT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "GET_ALL_EVENT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
        data: action.payload.data.data,
      };
    }
    case "GET_ALL_EVENT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.data.msg,
      };
    }
    default:
      return state;
  }
};

export default event;
