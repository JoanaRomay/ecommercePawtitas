import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import categoriaService from "../services/categoriaService";
import { Trash2, SquarePlus, SquarePen, RefreshCw, Search, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import EditarCategoriasModal from "../components/EditarCategoriasModal";
import CrearCategoriaModal from "../components/CrearCategoriaModal"; // Importa el modal correcto con Activo/Inactivo
import Swal from "sweetalert2";


function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("all");
  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [showCrearModal, setShowCrearModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const totalPages = Math.ceil(categorias.length / itemsPerPage);

 const fetchCategorias = async () => {
  try {
    const res = await categoriaService.getAll({
      search,
      activa: estadoFiltro !== "all" ? estadoFiltro : undefined,
    });

    // 🧠 Ordenar alfabéticamente por nombre (insensible a mayúsculas)
    const lista = (res.data.data || res.data || []).sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    setCategorias(lista);
  } catch (err) {
    console.error("Error al obtener categorías:", err);
    setCategorias([]);
  }
};


  useEffect(() => {
    setCurrentPage(1);
    fetchCategorias();
  }, [search, estadoFiltro]);

  const handleDelete = async (categoria) => {
  if (!categoria?.id) return;

  const result = await Swal.fire({
    title: `¿Desea desactivar la categoría "${categoria.nombre}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, desactivar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    confirmButtonColor: "#dc2626", // rojo
    cancelButtonColor: "#6b7280", // gris
  });

  if (result.isConfirmed) {
    try {
      await categoriaService.softDelete(categoria.id);
      toast.success("Categoría desactivada correctamente");
      fetchCategorias(); // refresca la lista
    } catch (err) {
      console.error("Error al desactivar la categoría:", err);
      toast.error("No se pudo desactivar la categoría");
    }
  }
};

  const handleRestore = async (categoria) => {
    if (!categoria?.id) return;
    try {
      await categoriaService.restore(categoria.id);
      toast.success("Categoría restaurada correctamente");
      fetchCategorias();
    } catch (err) {
      console.error("Error al restaurar la categoría:", err);
      toast.error("No se pudo restaurar la categoría");
    }
  };

  const handleOpenEditar = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setIsEditarOpen(true);
  };

  const handleCloseEditar = () => {
    setCategoriaSeleccionada(null);
    setIsEditarOpen(false);
  };

  const handleSaveCategoria = async (datos, id) => {
    try {
      if (id) {
        await categoriaService.update(id, datos);
        toast.success("Categoría actualizada correctamente");
      } else {
        await categoriaService.create(datos);
        toast.success("Categoría creada correctamente");
      }
      fetchCategorias();
      handleCloseEditar();
      setShowCrearModal(false);
    } catch (err) {
      console.error("Error al guardar categoría:", err);
      toast.error("categoria ya existente");
    }
  };

  // Paginación local
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCategorias = categorias.slice(indexOfFirst, indexOfLast);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-[rgb(19,19,20)] p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold leading-none">Categorías</h2>
            <button
              onClick={() => setShowCrearModal(true)}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 hover:shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gradient-to-r from-purple-800 to-purple-600 text-white"
            >
              <SquarePlus />
            </button>
          </div>

          {/* Buscador y filtro */}
          <div className="flex items-center mt-6 mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar categorías..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-700 bg-[rgb(50,50,55)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <select
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-700 bg-[rgb(50,50,55)] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>

          {/* Tabla */}
          <div className="space-y-6 mt-6">
            <div className="bg-[rgb(50,50,55)] rounded-2xl shadow-sm border border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300">Todas las Categorías</h3>
                  <p className="text-sm text-gray-400 mt-0.5">Lista completa de categorías de productos</p>
                </div>
              </div>

              <div className="px-6 py-4 overflow-x-auto">
                <table className="w-full min-w-[700px] divide-y divide-gray-600">
                  <thead>
                    <tr className="text-left text-sm">
                      <th className="py-3 pr-4 text-gray-300">Nombre</th>
                      <th className="py-3 pr-4 text-gray-300">Descripción</th>
                      <th className="py-3 pr-4 text-gray-300">Estado</th>
                      <th className="py-3 text-right text-gray-300">Acciones</th>
                    </tr>
                  </thead>

                  <tbody className="bg-[rgb(50,50,55)] divide-y divide-gray-600">
                    {currentCategorias.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-6 text-center text-gray-400">
                          {search
                            ? `No hay categorías que coincidan con "${search}"`
                            : "No hay categorías disponibles"}
                        </td>
                      </tr>
                    ) : (
                      currentCategorias.map((categoria) => (
                        <tr
                          key={categoria.id}
                          className={`group transition-colors relative ${
                            !categoria.activa
                              ? "line-through opacity-60"
                              : "hover:bg-[rgb(60,60,65)]"
                          }`}
                        >
                          <td className="py-3">
                            <div className="font-medium text-gray-300 group-hover:text-gray-200 transition-colors">
                              {categoria.nombre}
                            </div>
                          </td>
                          <td className="py-3 max-w-xs">
                            <div className="font-medium text-gray-300 group-hover:text-gray-200 truncate transition-colors">
                              {categoria.descripcion}
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                categoria.activa
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {categoria.activa ? "Activo" : "Inactivo"}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleOpenEditar(categoria)}
                                className="text-blue-600 hover:text-blue-500 transition-colors"
                                title="Editar"
                              >
                                <SquarePen className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() =>
                                  categoria.activa
                                    ? handleDelete(categoria)
                                    : handleRestore(categoria)
                                }
                                className={`transition-colors ${
                                  categoria.activa
                                    ? "text-red-600 hover:text-red-700"
                                    : "text-green-500 hover:text-green-600"
                                }`}
                                title={categoria.activa ? "Desactivar" : "Restaurar"}
                              >
                                {categoria.activa ? <Trash2 className="h-5 w-5" /> : <RefreshCw className="h-5 w-5" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="flex justify-center items-center mt-4 space-x-2 pb-5 text-gray-300">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="px-3 py-1">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Modales */}
        <CrearCategoriaModal
          isOpen={showCrearModal}
          onClose={() => setShowCrearModal(false)}
          onSave={handleSaveCategoria} // Recarga la lista desde el modal
        />

        <EditarCategoriasModal
          isOpen={isEditarOpen}
          onClose={handleCloseEditar}
          categoria={categoriaSeleccionada}
          onSave={handleSaveCategoria}
        />
      </div>
    </div>
  );
}

export default Categorias;
