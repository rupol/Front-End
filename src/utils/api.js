import axios from "axios";

export function getToken() {
  return localStorage.getItem("token");
}

export default function() {
  return axios.create({
    baseURL: "https://key-conservation-app.herokuapp.com/api",
    headers: {
      Authorization: getToken()
    }
  });
}
