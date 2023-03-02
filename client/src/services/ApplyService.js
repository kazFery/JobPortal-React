import http from "../http-common";

const getAll = () => {
  return http.get("/postings");
};

const getUser = (id) => {
  return http.get(`/users/${id}`);
};

const create = (data) => {
  return http.post("/apply", data);
};

const update = (id, data) => {
  return http.put(`/postings/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/postings/${id}`);
};

const findByTitle = (title) => {
  return http.get(`/postings?title=${title}`);
};

const getAllAplicationsByCompanyId = (companyId) => {
  return http.get(`/apply/?ownerId=${companyId}`);
};

const updateStatusAplications = (id) => {
  return http.patch(`/apply/status/${id}`);
};

const ApplyService = {
  getAll,
  getUser,
  create,
  update,
  remove,
  findByTitle,
  getAllAplicationsByCompanyId,
  updateStatusAplications,
};

export default ApplyService;
