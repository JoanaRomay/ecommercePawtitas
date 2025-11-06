import api from "./api";

const BASE_URL = "/roles";

const rolService = {
  getAll: async () => {
    return api.get(BASE_URL);
  },
  getById: async (id) => {
    return api.get(`${BASE_URL}/${id}`);
  },
  create: async (data) => {
    return api.post(BASE_URL, data);
  },
  update: async (id, data) => {
    return api.put(`${BASE_URL}/${id}`, data);
  },
  delete: async (id) => {
    return api.delete(`${BASE_URL}/${id}`);
  },
};

export default rolService;
