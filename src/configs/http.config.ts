import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/v1/exam/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
