import axios from "../../utils/axios";

export const getDataEvent = () => {
  return {
    type: "GET_DATA_EVENT",
    payload: axios.get(
      "/event?page=1&limit=5&searchName=&sort=&searchDateShow="
    ),
  };
};

export const getDataEventById = (id) => {
  return {
    type: "GET_EVENT_BY_ID",
    payload: axios.get(`/event/${id}`),
  };
};

export const createEvent = (data) => {
  return {
    type: "CREATE_EVENT",
    payload: axios.post("/event", data),
  };
};

export const updateEvent = (data, id) => {
  return {
    type: "UPDATE_EVENT",
    payload: axios.patch(`/event/${id}`, data),
  };
};

export const deleteEvent = (id) => {
  return {
    type: "DELETE_EVENT",
    payload: axios.delete(`/event/${id}`),
  };
};

export const getAllEvent = () => {
  return {
    type: "GET_ALL_EVENT",
    payload: axios.get("/event"),
  };
};
