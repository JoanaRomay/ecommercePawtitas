import api from './api';

const BASE_URL = '/productos';

const productoService = {
  // Obtener todos los productos con filtros y paginación
  getAll: async ({ search, categoriaId, page = 1, limit = 10 } = {}) => {
    const params = {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(categoriaId ? { categoriaId } : {})
    };
    return api.get(BASE_URL, { params });
  },

  // Obtener producto por ID
  getById: async (id) => {
    if (!id) throw new Error("ID requerido");
    const res = await api.get(`${BASE_URL}/${id}`);
    return Array.isArray(res.data?.data) ? res.data.data[0] : res.data.data;
  },

  // Crear producto
  create: async (data) => {
    if (!data) throw new Error("Datos requeridos");
    return api.post(BASE_URL, data);
  },

  // Actualizar producto
  update: async (id, data) => {
    if (!id || !data) throw new Error("ID y datos requeridos");
    return api.put(`${BASE_URL}/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Eliminar producto
  delete: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.delete(`${BASE_URL}/${id}`);
  },

  // NUEVO: Obtener tipos de mascota
  getTiposMascota: async () => {
    return api.get(`${BASE_URL}/tipos-mascota`);
  },
};

export default productoService;
