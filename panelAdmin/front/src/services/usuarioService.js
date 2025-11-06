import api from './api';

const BASE_URL = '/usuarios';

const usuarioService = {
  // Obtener todos los usuarios
  getAll: async ({ page = 1, limit = 10, search, rol } = {}) => {
    const params = {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(rol ? { rol } : {}), // para filtrar por rol si quieres
    };
    return api.get(BASE_URL, { params });
  },

  // Obtener administradores
 getAdministradores: async ({ page = 1, limit = 10, search } = {}) => {
  const params = { page, limit, ...(search ? { search } : {}) };
  return api.get(`${BASE_URL}/administradores`, { params });
},


  // Obtener clientes
  getClientes: async ({ page = 1, limit = 10, search } = {}) => {
    const params = { page, limit, ...(search ? { search } : {}) };
    return api.get(`${BASE_URL}/clientes`, { params });
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

  delete: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.delete(`${BASE_URL}/${id}`);
    },
  softDelete: async (id) => {
  if (!id) throw new Error("ID requerido");
  return api.put(`/usuarios/${id}/desactivar`);
},

restore: async (id) => {
  if (!id) throw new Error("ID requerido");
  return api.put(`/usuarios/${id}/restaurar`);
},

};

export default usuarioService;
