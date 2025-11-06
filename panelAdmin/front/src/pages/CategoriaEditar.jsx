import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import categoriaService from "../services/categoriaService";
import { MoveLeft } from "lucide-react";
function CategoriaEditar() {
  const navigate = useNavigate();

  const irAtras = () => {
    navigate('/categorias');
  };

  const [categorias, setCategorias] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  // Trae todas las categorías desde la BD
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await categoriaService.getAll({ search: "", activa: "all" });
        setCategorias(res.data.data);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };
    fetchCategorias();
  }, []);

  // Carga datos de la categoría seleccionada
  useEffect(() => {
    if (!selectedId) return;

    const categoria = categorias.find(c => c.id === selectedId);
    if (categoria) {
      setFormData({
        name: categoria.nombre,
        description: categoria.descripcion,
        status: categoria.activa ? "active" : "inactive",
      });
    }
  }, [selectedId, categorias]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      alert("Selecciona primero una categoría para editar");
      return;
    }
    try {
      // Actualiza en la BD
      await categoriaService.update(selectedId, {
        nombre: formData.name,
        descripcion: formData.description,
        activa: formData.status === "active",
      });

      // Actualiza localmente el listado de categorías
      setCategorias(prev => prev.map(c => 
        c.id === selectedId 
          ? { ...c, nombre: formData.name, descripcion: formData.description, activa: formData.status === "active" }
          : c
      ));

      alert("Categoría actualizada correctamente");
      navigate('/categorias');
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar la categoría");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-white text-3xl font-bold leading-none">Editar Categoria</h2>
            <button 
              onClick={irAtras} 
              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
              <MoveLeft />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-6 max-w-2xl">
            {/* Select de Categorías */}
            <div className="flex flex-col">
              <label htmlFor="selectCategoria" className="mb-2 font-semibold text-gray-700">
                Selecciona Categoría
              </label>
              <select
                id="selectCategoria"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Selecciona una categoria</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre} {cat.activa ? "(Activo)" : "(Inactivo)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Nombre de la Categoría */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
                Nombre de la Categoría
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ej: Electrónicos"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Descripción */}
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-semibold text-gray-700">
                Descripción
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe qué tipo de productos incluye esta categoría..."
                rows={3}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              />
            </div>

            {/* Estado */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700">Estado</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            {/* Botón Guardar */}
            <div className="flex justify-end gap-4">
              <button 
                type="button" 
                onClick={irAtras} 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CategoriaEditar;
