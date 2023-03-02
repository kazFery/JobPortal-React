import axios from "axios";

const rootURL = process.env.REACT_APP_ROOT_URL;

export default axios.create({
  baseURL: rootURL + "/api",
  headers: {
    "Content-type": "application/json",
  },
});
