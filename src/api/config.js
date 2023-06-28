import axios from "axios";

export const api = axios.create({
  baseURL: "http://5.189.180.8:8010",
});

export const methodApi = async (method, url, data) => {
  let response;
  if (method === "post") {
    response = await api.post(url, data);
  } else if (method === "get") {
    response = await api.get(url, data);
  }
  return response;
};
