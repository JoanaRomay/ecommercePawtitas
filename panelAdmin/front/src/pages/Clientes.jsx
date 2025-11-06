import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import usuarioService from "../services/usuarioService";
import { Trash2, SquarePlus, SquarePen, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import EditarUsuariosModal from "../components/EditarUsuariosModal";
import Swal from "sweetalert2";

function Clientes() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Traer clientes desde el backend
const fetchUsuarios = async () => {
  try {
    const res = await usuarioService.getClientes({ search });
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    // 🔤 Ordenar alfabéticamente por nombre
    const ordenados = data.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    setUsuarios(ordenados);
  } catch (err) {
    console.error("Error al obtener clientes:", err.response?.data || err.message);
    setUsuarios([]);
  }
};

  useEffect(() => {
    setCurrentPage(1);
    fetchUsuarios();
  }, [search]);

  // Calcular clientes visibles y total de páginas
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsuarios = usuarios.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleGotoPage = (page) => {
    setCurrentPage(page);
  };

  // Soft delete
 const handleSoftDelete = async (usuario) => {
  if (!usuario?.id) return;

  const result = await Swal.fire({
    title: `¿Desea desactivar al cliente "${usuario.nombre}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, desactivar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    confirmButtonColor: "#dc2626", // rojo
    cancelButtonColor: "#6b7280",   // gris
  });

  if (result.isConfirmed) {
    try {
      await usuarioService.softDelete(usuario.id);
      toast.success("Cliente desactivado correctamente");
      fetchUsuarios(); // refresca la lista
    } catch (err) {
      console.error("Error al desactivar cliente:", err);
      toast.error("No se pudo desactivar el cliente");
    }
  }
};

  // Restaurar cliente
  const handleRestore = async (usuario) => {
    if (!usuario?.id) return;

    try {
      await usuarioService.restore(usuario.id);
      toast.success("Cliente restaurado correctamente");
      fetchUsuarios();
    } catch (err) {
      console.error("Error al restaurar cliente:", err);
      toast.error("No se pudo restaurar el cliente");
    }
  };

  // Editar cliente
  const handleOpenEditar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setIsEditarOpen(true);
  };

  const handleCloseEditar = () => {
    setUsuarioSeleccionado(null);
    setIsEditarOpen(false);
  };

  const handleSaveUsuario = async (datos, id) => {
    try {
      await usuarioService.update(id, datos);
      toast.success("Cliente actualizado correctamente");
      fetchUsuarios();
      handleCloseEditar();
    } catch (err) {
      console.error("Error al actualizar cliente:", err);
      toast.error("No se pudo actualizar el cliente");
    }
  };

  const irANuevoUsuario = () => {
    navigate("/clientes/nuevo");
  };

  
return (
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="flex flex-1">
      <SideBar />

      <main className="flex-1 bg-[rgb(19,19,20)] p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-white text-3xl font-bold leading-none">Clientes</h2>
          <button
            onClick={irANuevoUsuario}
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 hover:shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gradient-to-r from-purple-800 to-purple-600 text-white"
          >
            <SquarePlus  />
          </button>
        </div>

        {/* Buscador */}
        <div className="flex items-center mt-6 mb-4 gap-4">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-700 bg-[rgb(50,50,55)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="space-y-6 mt-6">
          <div className="bg-[rgb(50,50,55)] rounded-2xl shadow-sm border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">Todos los Clientes</h3>
                <p className="text-sm text-gray-400 mt-0.5">Lista completa de clientes registrados</p>
              </div>
            </div>

            <div className="px-6 py-4 overflow-x-auto">
              <table className="w-full min-w-[700px] divide-y divide-gray-600">
                <thead>
                  <tr className="text-left text-sm text-gray-300">
                    <th className="py-3 pr-4">Nombre</th>
                    <th className="py-3 pr-4">Email</th>
                    <th className="py-3 pr-4">Estado</th>
                    <th className="py-3 pr-4">Fecha Creación</th>
                    <th className="py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-[rgb(50,50,55)] divide-y divide-gray-600">
                  {currentUsuarios.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-gray-400">
                        {search ? `No hay clientes que coincidan con "${search}"` : "No hay clientes disponibles"}
                      </td>
                    </tr>
                  ) : (
                    currentUsuarios.map((usuario) => (
                      <tr
                            key={usuario.id}
                            className={`group hover:bg-[rgb(60,60,65)] transition-colors ${
                                !usuario.activo ? "opacity-60 line-through" : ""
                            }`}
                            >

                        <td className="py-3">
                          <div className="font-medium text-gray-300 group-hover:text-gray-200 transition-colors">
                            {usuario.nombre}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="font-medium text-gray-300 group-hover:text-gray-200 transition-colors">
                            {usuario.email}
                          </div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              usuario.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {usuario.activo ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="py-3 text-gray-300">
                          {new Date(usuario.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleOpenEditar(usuario)}
                              className="text-blue-600 hover:text-blue-500 transition-colors"
                              title="Editar"
                            >
                              <SquarePen className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() =>
                                usuario.activo ? handleSoftDelete(usuario) : handleRestore(usuario)
                              }
                              className={`transition-colors ${
                                usuario.activo ? "text-red-600 hover:text-red-700" : "text-green-500 hover:text-green-600"
                              }`}
                              title={usuario.activo ? "Desactivar" : "Restaurar"}
                            >
                              {usuario.activo ? <Trash2 className="h-5 w-5" /> : <RefreshCw className="h-5 w-5" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Paginación */}
              {usuarios.length > 0 && (
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
              )}
            </div>
          </div>
        </div>

        {/* Modal de edición */}
        <EditarUsuariosModal
          isOpen={isEditarOpen}
          onClose={handleCloseEditar}
          usuario={usuarioSeleccionado}
          onSave={handleSaveUsuario}
        />
      </main>
    </div>
  </div>
);


}

export default Clientes;
