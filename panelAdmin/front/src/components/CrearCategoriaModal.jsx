import { useState } from "react";
import { X } from "lucide-react";
import categoriaService from "../services/categoriaService";
import toast from "react-hot-toast";

function CrearCategoriaModal({ isOpen, onClose, onSave }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activa, setActiva] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // Enviar datos correctos al padre
    onSave({
      nombre,
      descripcion,
      activa, // debe ser booleano true/false
    });
    onClose();
    setNombre("");
    setDescripcion("");
    setActiva(true);
  } catch (err) {
    console.error(err);
    setError("Hubo un error al crear la categoría");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
        {/* Botón X para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Categoría</h2>

        {/* Errores */}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl  border-gray-200">
         
            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  placeholder="Ej: Alimentos"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Descripción
                </label>
                <textarea
                  placeholder="Describe qué tipo de productos incluye esta categoría..."
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Estado
                </label>
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

          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-2xl text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
                type="submit"
                disabled={loading}            
                className={`px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {loading ? "Creando..." : "Crear Categoría"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearCategoriaModal;
