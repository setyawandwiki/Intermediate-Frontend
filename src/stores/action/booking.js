import axios from "../../utils/axios";

export const createBooking = (data) => {
  return {
    type: "CREATE_BOOKING",
    payload: axios.post(`/booking`, data),
  };
};

export const getBookingUserId = (id) => {
  return {
    type: "GET_BOOKING_BY_USER_ID",
    payload: axios.get(`/booking/${id}`),
  };
};

export const getAllBooking = () => {
  return {
    type: "GET_ALL_BOOKING",
    payload: axios.get(`/booking/`),
  };
};
