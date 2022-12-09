import axios from "../../utils/axios";

export const getDataUser = (data) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axios.get(`/user/${data}`),
  };
};

export const updateDataUser = (id, data) => {
  return {
    type: "UPDATE_DATA_USER",
    payload: axios.patch(`/user/${id}`, data),
  };
};

export const updateImageUser = (id, data) => {
  return {
    type: "UPDATE_IMAGE_USER",
    payload: axios.patch(`/user/updateImage/${id}`, data),
  };
};

export const updatePassword = (id, data) => {
  return {
    type: "UPDATE_PASSWORD_USER",
    payload: axios.patch(`/user/updatePassword/${id}`, data),
  };
};

export const userLogOut = () => {
  return {
    type: "LOGOUT_USER",
    payload: axios.post(`/auth/logout`),
  };
};
