// utils/cargarCategorias.js
import categoriaService from '../service/categoriaService.js';

const categorias = [

  {
    nombre: 'Gatos',
    descripcion: 'Productos para gatos: rascadores, camas y más.',
    imagenUrl: 'public/img/gatos/imgPiedritasGato.webp',
    activa: true
  },
  {
    nombre: 'Alimentos',
    descripcion: 'Variedad de alimentos balanceados y snacks para mascotas.',
    imagenUrl: 'public/img/alimentos/imgAlimentoGato.webp',
    activa: true
  },
  {
    nombre: 'Juguetes',
    descripcion: 'Pelotas, mordillos y otros juguetes para entretener a tu mascota.',
    activa: true
  }
];

async function cargarCategorias() {
    try {
      for (const categoria of categorias) {
        await categoriaService.crearCategoria(categoria);
        console.log(`✅ Categoría creada: ${categoria.nombre}`);
      }
      console.log('✅ Todas las categorías fueron cargadas correctamente.');
    } catch (error) {
      console.error('❌ Error al cargar categorías:', error.message || error);
    }
  }
  
cargarCategorias();
