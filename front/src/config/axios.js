import axios from "axios";

let instance = axios.create({
  baseURL: "localhost:4000",
  responseType: "json",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default instance;
