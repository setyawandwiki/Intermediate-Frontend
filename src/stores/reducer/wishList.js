const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  message: "",
};

const wishList = (state = initialState, action) => {
  console.log(action.payload?.data?.data);
  switch (action.type) {
    case "GET_WISHLIST_BY_WISHLIST_ID_PENDING":
      return {
        ...state,
        data: [],
        isError: false,
        isLoading: false,
        message: "",
      };
    case "GET_WISHLIST_BY_WISHLIST_ID_FULFILLED":
      return {
        ...state,
        isError: false,
        isLoading: false,
        message: "",
        data: action.payload.data.data,
      };
    case "GET_WISHLIST_BY_WISHLIST_ID_REJECTED":
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.message,
        data: [],
      };
    case "DELETE_WISHLIST_BY_ID_PENDING":
      return {
        ...state,
        data: [],
        isError: false,
        isLoading: false,
        message: "",
      };
    case "DELETE_WISHLIST_BY_ID_FULFILLED":
      return {
        ...state,
        isError: false,
        isLoading: false,
        message: action.payload.message,
      };
    case "DELETE_WISHLIST_BY_ID_REJECTED":
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.message,
        data: [],
      };
    default:
      return state;
  }
};

export default wishList;
