import { useEffect, useState } from "react";
import { X } from "lucide-react";

function EditarCategoriasModal({ isOpen, onClose, categoria, onSave }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activa, setActiva] = useState(true);

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre || "");
      setDescripcion(categoria.descripcion || "");
      setActiva(categoria.activa ?? true);
    }
  }, [categoria]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategoria = { nombre, descripcion, activa };
    onSave(updatedCategoria, categoria.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Categoría</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={activa}
              onChange={(e) => setActiva(e.target.checked)}
              className="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
            />
            <label className="text-sm text-gray-700">Activo</label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarCategoriasModal;
