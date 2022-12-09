import axios from "../../utils/axios";

export const getWishListById = (id) => {
  return {
    type: "GET_WISHLIST_BY_WISHLIST_ID",
    payload: axios.get(`/wishlist?page=&limit=&userId=${id}`),
  };
};

export const deleteWishList = (id) => {
  return {
    type: "DELETE_WISHLIST_BY_ID",
    payload: axios.delete(`/wishlist/${id}`),
  };
};
