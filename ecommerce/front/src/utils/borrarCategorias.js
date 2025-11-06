import categoriaService from '../service/categoriaService.js';

async function eliminarTodasCategorias() {
  try {
    const categorias = await categoriaService.obtenerCategorias();
    for (const cat of categorias) {
      await categoriaService.eliminarCategoria(cat.id);
      console.log(`🗑️ Categoría borrada: ${cat.nombre}`);
    }
    console.log('✅ Todas las categorías fueron eliminadas.');
  } catch (error) {
    console.error('❌ Error al eliminar categorías:', error);
  }
}

eliminarTodasCategorias();