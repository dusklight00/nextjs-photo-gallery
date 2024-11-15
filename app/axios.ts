import axios from "axios";

export const BASE_URL = "http://localhost:3000";

const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
