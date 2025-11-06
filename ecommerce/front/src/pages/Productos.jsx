import { useState, useEffect, useMemo } from 'react';
import Categorias from '../components/Categorias.jsx';
import Carrito from '../components/Carrito';
import categoriaService from '../service/categoriaService';
import productoServiceEcommerce from '../service/productoServiceEcommerce.js';
import CardsProductos from '../components/CardsProductos.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [mascotasSeleccionadas, setMascotasSeleccionadas] = useState([]); // ✅ array de tipos de mascota
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });
  const [openCarrito, setOpenCarrito] = useState(false);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;

  // Cargar productos
  useEffect(() => {
    productoServiceEcommerce.obtenerProductos()
      .then(data => setProductos(data))
      .catch(console.error);
  }, []);

  // Cargar categorías
  useEffect(() => {
    categoriaService.obtenerCategorias()
      .then(data => setCategorias([{ id: 0, nombre: 'Todos' }, ...data]))
      .catch(console.error);
  }, []);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    let nuevoCarrito;

    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      nuevoCarrito = existe
        ? prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)
        : [...prev, { ...producto, cantidad: 1 }];
      return nuevoCarrito;
    });

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('storage'));
  };

  // Actualizar cantidad
  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      setCarrito(prev => prev.filter(p => p.id !== id));
    } else {
      setCarrito(prev => prev.map(p => p.id === id ? { ...p, cantidad } : p));
    }
  };

  // Filtrado memoizado de productos
  const productosFiltrados = useMemo(() => {
    const idCategoriaSeleccionada =
      categorias.find(c => c.nombre === categoriaSeleccionada)?.id || 0;

    return productos.filter(p => {
      const coincideCategoria =
        idCategoriaSeleccionada === 0 || p.idCategoria === idCategoriaSeleccionada;

      const coincideBusqueda =
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(busqueda.toLowerCase());

      const coincideMascota =
        mascotasSeleccionadas.length === 0 || // sin selección → mostrar todos
        mascotasSeleccionadas.includes(p.tipoMascota);

      return coincideCategoria && coincideBusqueda && coincideMascota;
    });
  }, [productos, categorias, categoriaSeleccionada, busqueda, mascotasSeleccionadas]);

  // Resetear página al cambiar filtros o búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [categoriaSeleccionada, busqueda, mascotasSeleccionadas]);

  // Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    return productosFiltrados.slice(inicio, fin);
  }, [productosFiltrados, paginaActual]);


  return (
    <>
    
          
      <div>
        {/* Filtros y buscador */}
        <Categorias
          categorias={categorias}
          categoriaSeleccionada={categoriaSeleccionada}
          onCategoriaChange={setCategoriaSeleccionada}
          onBuscar={setBusqueda}
                  onMascotaChange={setMascotasSeleccionadas} // ✅ recibe array de tipos activos
                  
        />

        {/* Productos */}
              <div className="flex flex-wrap gap-8 w-full lg:w-[80%] mx-auto p-0">
                  {productosPaginados.map((p) => {
            const imagenPrincipal = Array.isArray(p.imgUrl)
              ? p.imgUrl[0] || '/placeholder.webp'
              : p.imgUrl || '/placeholder.webp';
            return (
              <CardsProductos
                key={p.id}
                id={p.id}
                nombre={p.nombre}
                precio={p.precio}
                imagen={imagenPrincipal}
                oferta={p.oferta}
                descuento={p.descuento}
                onAgregar={(producto) => {
                  agregarAlCarrito(producto);
                  toast.success(`${producto.nombre} agregado al carrito`, { autoClose: 2000 });
                }}
              />
            );
          })}
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-10 space-x-2 mb-10">
          <button
            onClick={() => setPaginaActual(p => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={paginaActual === 1}
          >
            <ArrowLeft />
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              className={`px-4 py-2 rounded ${paginaActual === i + 1
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={paginaActual === totalPaginas}
          >
            <ArrowRight />
          </button>
        </div>

        {/* Carrito */}
        <Carrito
          open={openCarrito}
          onClose={() => setOpenCarrito(false)}
          carrito={carrito}
          onActualizarCantidad={actualizarCantidad}
          onEliminarProducto={(id) => setCarrito(prev => prev.filter(p => p.id !== id))}
        />
      </div>
    </>
  );
}
