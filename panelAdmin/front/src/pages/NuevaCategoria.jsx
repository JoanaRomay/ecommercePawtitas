import { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import categoriaService from "../services/categoriaService"; // asegúrate que la ruta es correcta
import { MoveLeft } from "lucide-react";
function NuevaCategoria() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activa, setActiva] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const irAtras = () => {
    navigate("/categorias");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await categoriaService.create({
        nombre,
        descripcion,
        activa,
      });
      setLoading(false);
      navigate("/categorias"); // vuelve a la lista después de crear
    } catch (err) {
      console.error(err);
      setError("Hubo un error al crear la categoría");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold leading-none">Crear Categoría</h2>
            <button
              onClick={irAtras}
              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
              <MoveLeft />
            </button>
          </div>

          <div className="max-w-2xl space-y-6 mt-6">
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Información de la Categoría</h2>
                  <p className="text-sm text-gray-500">
                    Completa los datos básicos de la nueva categoría
                  </p>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre de la Categoría</label>
                    <input
                      type="text"
                      placeholder="Ej: Electrónicos"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <textarea
                      placeholder="Describe qué tipo de productos incluye esta categoría..."
                      rows={3}
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="w-full rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <select
                      value={activa ? "active" : "inactive"}
                      onChange={(e) => setActiva(e.target.value === "active")}
                      className="w-full rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={irAtras}
                  className="px-4 py-2 border rounded-2xl text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Creando..." : "Crear Categoría"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default NuevaCategoria;
