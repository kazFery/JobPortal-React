import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/admin/users", { headers: authHeader() });
};

const get = (id) => {
  return http.get(`/admin/users/${id}`, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/admin/users/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/admin/users/${id}`, { headers: authHeader() });
};

const UserService = {
  getAll,
  get,
  update,
  remove,
};

export default UserService;
