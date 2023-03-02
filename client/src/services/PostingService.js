import authHeader from "./auth-header";
import http from "../http-common";

const getAll = async () => {
  const response = await http.get("/postings");
  return response;
};

const get = (id) => {
  return http.get(`/postings/${id}`);
};

const create = (data) => {
  return http.post("/postings", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/postings/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/postings/${id}`, { headers: authHeader() });
};

const findByTitle = (title) => {
  return http.get(`/postings?title=${title}`);
};

const PostingService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle,
};

export default PostingService;
