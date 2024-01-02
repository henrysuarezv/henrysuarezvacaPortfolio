import axios from "./axios";

export const requestWaiterRequest = async (requestWaiter) =>
  axios.post(`/requestWaiter`, requestWaiter);
