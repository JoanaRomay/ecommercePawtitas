import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import productoService from "../services/productoService";
import categoriaService from "../services/categoriaService";
import { MoveLeft, Upload  } from "lucide-react";
import toast from "react-hot-toast";

function CrearProducto() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [tiposMascota, setTiposMascota] = useState([]);
  const [tipoMascotaSeleccionado, setTipoMascotaSeleccionado] = useState("");
const [destacado, setDestacado] = useState(false);

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await categoriaService.getAll({ page: 1, limit: 100 });
        setCategorias(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error cargando categorías:", err);
        setCategorias([]);
      }
    };
    fetchCategorias();
  }, []);

  // Cargar tipos de mascota
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await productoService.getAll({ page: 1, limit: 100 });
        const tipos = res.data?.data
          .map(p => p.tipoMascota)
          .filter(Boolean)
          .map(t => t.toLowerCase());
        const tiposUnicos = [...new Set(tipos)].map(t => t.charAt(0).toUpperCase() + t.slice(1));
        setTiposMascota(tiposUnicos);
      } catch (err) {
        console.error("Error cargando tipos de mascota:", err);
        setTiposMascota([]);
      }
    };
    fetchTipos();
  }, []);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    const selectedPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...selectedPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("stock", stock);
    formData.append("tipoMascota", tipoMascotaSeleccionado);
      formData.append("idCategoria", idCategoria);

    files.forEach(file => formData.append("imagenes", file));

    try {
      await productoService.create(formData);
      toast.success("Producto creado correctamente");
      navigate("/productos");
    } catch (err) {
      console.error("Error creando producto:", err);
      toast.error("No se pudo crear el producto");
    }
  };

  return (
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="flex flex-1">
      <SideBar />
      <main className="flex-1 bg-[rgb(19,19,20)] p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-white text-3xl font-bold">Crear Producto</h2>
          <button
            onClick={() => navigate("/productos")}
            className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
          >
            <MoveLeft />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Columna izquierda */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información Básica */}
              <div className="bg-[rgb(50,50,55)] p-4 rounded-2xl shadow-md space-y-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-white">Información Básica</h2>
                <input
                  type="text"
                  placeholder="Nombre del Producto"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full border border-gray-600 p-2 rounded-lg bg-[rgb(25,25,30)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <textarea
                  placeholder="Descripción del producto"
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  className="w-full border border-gray-600 p-2 rounded-lg bg-[rgb(25,25,30)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                  required
                />
              </div>

              {/* Precios e inventario */}
              <div className="bg-[rgb(50,50,55)] p-4 rounded-2xl shadow-md space-y-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-white">Precios e Inventario</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="number"
                    placeholder="Precio ($)"
                    value={precio}
                    onChange={e => setPrecio(e.target.value)}
                    className="w-full border border-gray-600 p-2 rounded-lg bg-[rgb(25,25,30)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    className="w-full border border-gray-600 p-2 rounded-lg bg-[rgb(25,25,30)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                              </div>
                              <div>
                                   {/* Checkbox destacado */}
              <div className="bg-[rgb(50,50,55)] p-4 rounded-2xl shadow-md border border-gray-700 mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="destacado"
                  checked={destacado}
                  onChange={(e) => setDestacado(e.target.checked)}
                  className="w-6 h-6 text-purple-500 bg-gray-800 border-2 border-gray-400 rounded focus:ring-2 focus:ring-purple-400 cursor-pointer"
                />
                <label htmlFor="destacado" className="text-sm text-gray-200 cursor-pointer">
                  Producto destacado
                </label>
              </div>
              
                              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-6">
              {/* Categoría */}
              <div className="bg-[rgb(50,50,55)] p-4 rounded-2xl shadow-md space-y-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-white">Categoría</h2>
                <select
                  value={idCategoria}
                  onChange={e => setIdCategoria(e.target.value)}
                  className="w-full border border-gray-600 p-2 rounded-lg bg-[rgb(25,25,30)] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Tipo de mascota */}
              <div className="bg-[rgb(50,50,55)] p-4 rounded-2xl shadow-md space-y-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-white">Tipo de mascota</h2>
                <select
                  value={tipoMascotaSeleccionado}
                  onChange={e => setTipoMascotaSeleccionado(e.target.value)}
                  className="w-full border border-gray-600 p-2 rounded-lg bg-[rgb(25,25,30)] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  {tiposMascota.map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Imágenes */}
              <div className="bg-[rgb(50,50,55)] p-4 rounded-2xl shadow-md border border-gray-700 flex flex-col items-center hover:bg-[rgb(60,60,65)] transition">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:border-purple-500">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-300 text-sm">Haz click o arrastra tus imágenes aquí</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFilesChange}
                    className="hidden"
                  />
                </label>
                {/* Previews */}
                <div className="flex gap-2 flex-wrap mt-2">
                  {previews.map((src, i) => (
                    <div key={i} className="relative w-24 h-24">
                      <img
                        src={src}
                        alt={`Vista previa ${i + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviews(prev => prev.filter((_, index) => index !== i));
                          setFiles(prev => prev.filter((_, index) => index !== i));
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

             
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/productos")}
              className="px-4 py-2 border rounded-md text-sm text-gray-300 hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold shadow-md hover:brightness-105 transition"
            >
              Crear Producto
            </button>
          </div>
        </form>
      </main>
    </div>
  </div>
);
;
}

export default CrearProducto;
