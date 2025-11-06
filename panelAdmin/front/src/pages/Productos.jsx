import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import productoService from "../services/productoService";
import { Trash2, SquarePlus, SquarePen, RefreshCw,Search,  ChevronLeft, ChevronRight  } from "lucide-react";
import EditarProductoModal from "../components/EditarProductoModal";
import categoriaService from "../services/categoriaService.js";
import api from '../services/api.js';
import { getImgUrl } from '../helpers/getImgUrl.js';
import toast from 'react-hot-toast';
import CrearProductoModal from "../components/CrearProductoModal.jsx";
import Swal from "sweetalert2";


function Productos() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [showModal, setShowModal] = useState(false); // estado para abrir/cerrar CrearProductoModal

    const itemsPerPage = 7;
        // Calcular productos visibles
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = productos.slice(indexOfFirst, indexOfLast);

    // Número de páginas
    const totalPages = Math.ceil(productos.length / itemsPerPage);

    const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const abrirModalEdicion = async (idProducto) => {
        try {
            const producto = await productoService.getById(idProducto); 
            setProductoSeleccionado(producto); // acá ya es un objeto
            setOpen(true);
        } catch (error) {
            console.error("Error al cargar el producto:", error);
        }
    };

    
    const handleSave = async (formData, id) => {
    try {
        console.log("ID en handleSave:", id);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const res = await api.put(`/productos/${id}`, formData);

        console.log("Producto actualizado:", res.data);

        const updatedProduct = res.data.data;

        setProductos(prev =>
            prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        );

        // Aquí ponemos el toast de éxito
        toast.success("Producto actualizado correctamente");

        setOpen(false);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        toast.error("No se pudo actualizar el producto");
    }
};




  // Traer productos desde la BD
    const fetchProductos = async () => {
  try {
    const res = await productoService.getAll({
      search,
      categoriaId: categoriaSeleccionada || undefined,
    });

    // Asegurarte de que sea un array
    const lista = Array.isArray(res.data?.data) ? res.data.data : [];

    // ✅ Ordenar alfabéticamente por nombre (A-Z)
    lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));

    setProductos(lista);
  } catch (err) {
    console.error("Error al obtener productos:", err.response?.data || err.message);
    setProductos([]);
  }
};



    useEffect(() => {
    fetchProductos();
    }, [search, categoriaSeleccionada]);

  const handleDelete = async (producto) => {
  if (!producto?.id) return;

  // Confirmación con SweetAlert2
  const result = await Swal.fire({
    title: `¿Desea eliminar el producto "${producto.nombre}"?`,
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    confirmButtonColor: "#dc2626", // rojo
    cancelButtonColor: "#6b7280", // gris
  });

  if (result.isConfirmed) {
    try {
      await productoService.delete(producto.id);

      // ✅ Marcar como inactivo en el estado
      setProductos((prev) =>
        prev.map((p) =>
          p.id === producto.id ? { ...p, estado: false } : p
        )
      );

      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("No se pudo eliminar el producto");
    }
  }
};

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await categoriaService.getAll();
                setCategorias(Array.isArray(res.data?.data) ? res.data.data : []);
            } catch (err) {
                console.error("Error al traer categorías:", err);
            }
        };
            fetchCategorias();
    },[]);


    const handleActivar = async (producto) => {
  if (!producto?.id) return;

  try {
    await api.put(`/productos/${producto.id}/activar`);
    setProductos((prev) =>
      prev.map((p) => (p.id === producto.id ? { ...p, estado: true } : p))
    );
    toast.success("Producto activado correctamente");

  } catch (error) {
    console.error("Error al activar el producto:", error);
    toast.error("No se pudo eliminar el producto");

  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
              <SideBar />
              
        <main className="flex-1 bg-[rgb(19,19,20)] p-6 overflow-y-auto">
                    <div className="flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold leading-none">Productos</h2>
      <div>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 hover:shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gradient-to-r from-purple-800 to-purple-600 text-white"
      >
        <SquarePlus />
      </button>

      <CrearProductoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => {
          console.log("Producto creado, recargar lista si hace falta");
        }}
      />
    </div>
</div>


        {/* Buscador + Filtro de categoría */}
        <div className="flex flex-wrap items-center gap-3 mt-6 mb-4">
        {/* Input de búsqueda */}
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-700 bg-[rgb(50,50,55)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
        </div>

        {/* Select de categoría */}
        <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-700 bg-[rgb(50,50,55)] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
                {cat.nombre}
            </option>
            ))}
        </select>
        </div>


          <div className="bg-[rgb(50,50,55)] rounded-2xl shadow-sm border border-gray-700 overflow-hidden">

            <div className="px-6 py-4 border-b border-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                <h3 className="text-lg font-semibold text-gray-300">Todos los Productos</h3>
                <p className="text-sm text-gray-400 mt-0.5">Lista completa de productos en tu tienda</p>
                </div>
            </div>

  <div className="px-6 py-4">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] divide-y divide-gray-600">
        <thead>
          <tr className="text-left text-sm">
            <th className="py-3 pr-4 text-gray-300">Producto</th>
            <th className="py-3 text-right text-gray-300">Categoría</th>
            <th className="py-3  text-gray-300 text-right">Precio</th>
            <th className="py-3 text-gray-300 text-right">Stock</th>
            <th className="py-3 text-right text-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-[rgb(50,50,55)] divide-y divide-gray-600">
  {currentProducts.length === 0 ? (
    <tr>
      <td colSpan="5" className="py-6 text-center text-gray-400">
        {search
          ? `No hay productos que comiencen con "${search}"`
          : "No hay productos disponibles"}
      </td>
    </tr>
  ) : (
    currentProducts.map((producto) => (
      <tr
        key={producto.id}
        className={`group hover:bg-[rgb(60,60,65)] relative transition-colors ${
          !producto.estado ? "opacity-60 line-through" : ""
        }`}
      >
        {/* Producto y miniatura */}
        <td className="py-3 w-xl">
          <div className="flex items-center space-x-3 text-gray-300 group-hover:text-gray-200 transition-colors">
            <img
              src={getImgUrl(
                Array.isArray(producto.imgUrl)
                  ? producto.imgUrl[0]
                  : JSON.parse(producto.imgUrl || "[]")[0] || "/placeholder.png"
              )}
              alt={producto.nombre}
              className="h-10 w-10 rounded-md object-cover"
            />
            <div className="leading-tight">
              <div className="font-medium">{producto.nombre}</div>
            </div>
          </div>
        </td>

        {/* Categoría */}
        <td className="py-3 text-sm w-20 text-right text-gray-300 group-hover:text-gray-200 transition-colors">
          {producto.categoria?.nombre || "-"}
        </td>

        {/* Precio */}
        <td className="py-3 text-sm text-gray-300 text-right group-hover:text-gray-200 transition-colors">
          ${producto.precio}
        </td>

        {/* Stock */}
        <td className="py-3 text-sm text-gray-300 text-right  group-hover:text-gray-200 transition-colors">
          {producto.stock}
        </td>

        {/* Acciones */}
        <td className="py-3 text-right">
          <div className="flex justify-end space-x-2">
            {/* Editar */}
            <button
              onClick={() => abrirModalEdicion(producto.id)}
              className="text-blue-600 hover:text-blue-500 transition-colors"
              title="Editar"
            >
              <SquarePen className="h-5 w-5" />
            </button>

            {/* Eliminar / Activar */}
            <button
              onClick={() =>
                producto.estado
                  ? handleDelete(producto)
                  : handleActivar(producto)
              }
              className={`transition-colors ${
                producto.estado
                  ? "text-red-600 hover:text-red-700"
                  : "text-green-500 hover:text-green-600"
              }`}
              title={producto.estado ? "Eliminar" : "Activar"}
            >
              {producto.estado ? (
                <Trash2 className="h-5 w-5" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>


    </table>
    <div className="flex justify-center items-center mt-4 space-x-4 text-gray-300">
        <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
             <ChevronLeft className="w-4 h-4" /> 
        </button>

        <span className="px-3 py-1">
            Página {currentPage} de {totalPages}
        </span>

        <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
            <ChevronRight className="w-4 h-4" />
        </button>
    </div>

        </div>
     </div>
    </div>


        </main>
          </div>
          <EditarProductoModal
                isOpen={open}
                onClose={() => setOpen(false)}
                producto={productoSeleccionado}
                onSave={handleSave}
                categorias={categorias}
         />

    </div>
  );
}

export default Productos;
