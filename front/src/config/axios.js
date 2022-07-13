/**
 * Here lies the configuration for axios
 */
import axios from "axios";

let instance = axios.create({
  baseURL: "http://127.0.0.1:4000", //backend ip and port
  responseType: "json", //this is the format used to comunicate between back and front
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default instance;
