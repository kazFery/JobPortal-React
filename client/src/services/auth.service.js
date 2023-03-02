import axios from "axios";

const API_URL = process.env.REACT_APP_ROOT_URL + "/api/auth";

const register = (username, email, password, company) => {
  debugger;
  return axios.post(API_URL + "/signup", {
    username,
    email,
    password,
    company,
  });
};

const login = async (username, password) => {
  const response = await axios
    .post(API_URL + "/signin", {
      username,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
