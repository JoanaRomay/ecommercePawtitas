import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import usuarioService from "../services/usuarioService";
import CrearAdmin from "../components/CrearAdmin";
import EditarAdministradorModal from "../components/EditarAdministradorModal";

import { Edit, Trash2, RefreshCw, Search, SquarePlus, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function Administradores() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [adminSeleccionado, setAdminSeleccionado] = useState(null);

  // 🔹 Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);

  // Función para traer administradores
 const fetchAdministradores = async () => {
  try {
    const res = await usuarioService.getAdministradores({ search });

    // 🧠 Ordenar alfabéticamente por nombre (sin importar mayúsculas/minúsculas)
    const lista = (Array.isArray(res.data?.data) ? res.data.data : []).sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    setUsuarios(lista);
  } catch (err) {
    console.error("Error al obtener administradores:", err.response?.data || err.message);
    setUsuarios([]);
  }
};

  useEffect(() => {
    setCurrentPage(1);
    fetchAdministradores();
  }, [search]);

  // Navegación local
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsuarios = usuarios.slice(indexOfFirst, indexOfLast);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Navegar a editar usuario

  // Soft delete (desactivar)
  const handleSoftDelete = async (usuario) => {
  if (!usuario?.id) return;

  const result = await Swal.fire({
    title: `¿Desea desactivar al usuario "${usuario.nombre}"?`,
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
      await usuarioService.softDelete(usuario.id);
      toast.success("Usuario desactivado correctamente");
      fetchAdministradores(); // refresca la lista
    } catch (error) {
      console.error("Error al desactivar el usuario:", error);
      toast.error("No se pudo desactivar el usuario");
    }
  }
};

  // Restaurar usuario
  const handleRestore = async (usuario) => {
    if (!usuario?.id) return;

    try {
      await usuarioService.restore(usuario.id);
      toast.success("Usuario restaurado correctamente");
      fetchAdministradores();
    } catch (error) {
      console.error("Error al restaurar el usuario:", error);
      toast.error("No se pudo restaurar el usuario");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 bg-[rgb(19,19,20)] p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold leading-none">Administradores</h2>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 hover:shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gradient-to-r from-purple-800 to-purple-600 text-white"
            >
              <SquarePlus />
            </button>
          </div>

          {/* Buscador */}
          <div className="flex items-center mt-6 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar administradores..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-700 bg-[rgb(50,50,55)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="space-y-6 mt-6">
            <div className="bg-[rgb(50,50,55)] rounded-2xl shadow-sm border border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300">Todos los Administradores</h3>
                  <p className="text-sm text-gray-400 mt-0.5">Lista completa de administradores registrados</p>
                </div>
              </div>

              <div className="px-6 py-4 overflow-x-auto">
                <table className="w-full min-w-[700px] divide-y divide-gray-600">
                  <thead>
                    <tr className="text-left text-sm text-gray-300">
                      <th className="py-3 pr-4">Nombre</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Rol</th>
                      <th className="py-3 pr-4">Fecha Creación</th>
                      <th className="py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[rgb(50,50,55)] divide-y divide-gray-600">
                    {currentUsuarios.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-6 text-center text-gray-400">
                          {search
                            ? `No hay administradores que coincidan con "${search}"`
                            : "No hay administradores registrados"}
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
                          <td className="py-3 max-w-xs">
                            <div className="truncate text-gray-300 group-hover:text-gray-200 transition-colors">
                              {usuario.email}
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                usuario.rol?.codigo === "ADMIN"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : usuario.rol?.codigo === "SUPER_ADMIN"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {usuario.rol?.codigo || "Sin rol"}
                            </span>
                          </td>
                          <td className="py-3 text-gray-300 group-hover:text-gray-200 transition-colors">
                            {new Date(usuario.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => {
                                  setAdminSeleccionado(usuario);
                                  setShowEditModal(true);
                                }}
                                className="text-blue-600 group-hover:text-blue-500 transition-colors"
                                title="Editar"
                              >
                                <Edit className="h-5 w-5" />
                              </button>

                              <button
                                onClick={() =>
                                  usuario.activo ? handleSoftDelete(usuario) : handleRestore(usuario)
                                }
                                className={`transition-colors ${
                                  usuario.activo
                                    ? "text-red-600 hover:text-red-700"
                                    : "text-green-500 hover:text-green-600"
                                }`}
                                title={usuario.activo ? "Desactivar" : "Restaurar"}
                              >
                                {usuario.activo ? (
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
              </div>

      {/* 🔹 Paginación */}
{usuarios.length > 0 && (
  <div className="flex justify-center items-center mt-4 space-x-4 pb-5 text-gray-300">
    <button
      onClick={handlePrevPage}
      disabled={currentPage === 1}
      className="flex items-center gap-1 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
    >
      <ChevronLeft className="w-4 h-4" />
    </button>

    <span className="px-3 py-1">
      Página {currentPage} de {totalPages || 1}
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

          {/* Modal de creación */}
          {showModal && (
            <CrearAdmin
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSave={async (datos) => {
                try {
                  await usuarioService.create(datos);
                  toast.success("Administrador creado correctamente");
                  setShowModal(false);
                  fetchAdministradores();
                } catch (err) {
                  toast.error(err.response?.data?.error || "Error al crear administrador");
                }
              }}
            />
          )}

          {/* Modal de edición */}
          {showEditModal && adminSeleccionado && (
            <EditarAdministradorModal
              isOpen={showEditModal}
              admin={adminSeleccionado}
              onClose={() => setShowEditModal(false)}
              onSave={async (datos) => {
                try {
                  await usuarioService.update(adminSeleccionado.id, datos);
                  toast.success("Administrador actualizado correctamente");
                  setShowEditModal(false);
                  fetchAdministradores();
                } catch (err) {
                  toast.error(err.response?.data?.error || "Error al actualizar administrador");
                }
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default Administradores;
