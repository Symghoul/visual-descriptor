import axios from "axios";

let instance = axios.create({
  baseURL: "http://127.0.0.1:4000",
  responseType: "json",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default instance;
