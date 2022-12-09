const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_PENDING": {
      return {
        ...state,
        data: {},
      };
    }
    case "GET_USER_BY_ID_FULFILLED": {
      return {
        ...state,
        data: action.payload.data,
      };
    }
    case "GET_USER_BY_ID_REJECTED": {
      return {
        ...state,
        data: {},
      };
    }
    case "UPDATE_DATA_USER_PENDING": {
      return {
        ...state,
        data: {},
        message: "",
        isError: false,
        isLoading: true,
      };
    }
    case "UPDATE_DATA_USER_FULFILLED": {
      return {
        ...state,
        data: action.payload.data,
        isError: false,
        isLoading: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_DATA_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.response.data.msg,
      };
    }
    case "UPDATE_IMAGE_USER_PENDING": {
      return {
        ...state,
        data: {},
        message: "",
        isError: false,
        isLoading: true,
      };
    }
    case "UPDATE_IMAGE_USER_FULFILLED": {
      return {
        ...state,
        data: action.payload.data,
        isError: false,
        isLoading: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_IMAGE_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.response.data.msg,
      };
    }
    case "UPDATE_PASSWORD_USER_PENDING": {
      return {
        ...state,
        data: {},
        message: "",
        isError: false,
        isLoading: true,
      };
    }
    case "UPDATE_PASSWORD_USER_FULFILLED": {
      return {
        ...state,
        data: action.payload.data,
        isError: false,
        isLoading: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_PASSWORD_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.response.data.msg,
      };
    }
    case "LOGOUT_USER_PENDING": {
      return {
        ...state,
        data: {},
        message: "",
      };
    }
    case "LOGOUT_USER_FULFILLED": {
      return {
        ...state,
        data: {},
        message: action.payload.data.msg,
      };
    }
    case "LOGOUT_USER_REJECTED": {
      return {
        ...state,
        data: {},
        message: action.payload.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
