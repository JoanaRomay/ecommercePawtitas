import api from './api';

const BASE_URL = '/categorias';

const categoriaService = {
  getAll: async ({ page = 1, limit = 10, search, activa } = {}) => {
    const params = { page, limit, ...(search ? { search } : {}), ...(activa !== undefined ? { activa } : {}) };
    return api.get(BASE_URL, { params });
  },

  getById: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.get(`${BASE_URL}/${id}`);
  },

  create: async (data) => {
    if (!data) throw new Error("Datos requeridos");
    return api.post(BASE_URL, data);
  },

  update: async (id, data) => {
    if (!id || !data) throw new Error("ID y datos requeridos");
    return api.put(`${BASE_URL}/${id}`, data);
  },

  restore: async (id) => {
  if (!id) throw new Error("ID requerido");
  return api.patch(`${BASE_URL}/${id}/restore`);
    },

  getProductosByCategoria: async (id, { page = 1, limit = 10 } = {}) => {
    if (!id) throw new Error("ID requerido");
    return api.get(`${BASE_URL}/${id}/productos`, { params: { page, limit } });
    },

// Desactivar categoría (soft delete)
softDelete: async (id) => {
  if (!id) throw new Error("ID requerido");
  return api.delete(`${BASE_URL}/${id}`);
},


};


export default categoriaService;
