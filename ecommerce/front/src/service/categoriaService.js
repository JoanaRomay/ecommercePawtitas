import API from './api.js';

const categoriaService = {
  obtenerCategorias: async () => {
    const response = await API.get('/categorias');
    return response.data;
  },

};

export default categoriaService;
