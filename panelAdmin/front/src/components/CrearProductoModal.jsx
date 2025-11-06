// CrearProductoModal.js
import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import productoService from "../services/productoService";
import categoriaService from "../services/categoriaService";
import toast from "react-hot-toast";

function CrearProductoModal({ isOpen, onClose, onSave }) {
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
    const [oferta, setOferta] = useState(false);
const [descuento, setDescuento] = useState(0);

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await categoriaService.getAll({ page: 1, limit: 100 });
        setCategorias(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }
    };
    fetchCategorias();
  }, []);

// Cargar tipos de mascota desde backend
useEffect(() => {
  const fetchTiposMascota = async () => {
    try {
      const res = await productoService.getTiposMascota();
      console.log(res.data); // <- aquí debería salir { success: true, data: [...] }
      setTiposMascota(res.data.data || []);
    } catch (err) {
      console.error("Error cargando tipos de mascota:", err);
      console.error(err.response?.data); // <- aquí se ve el body del error 400
      setTiposMascota([]);
    }
  };
  fetchTiposMascota();
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
      if (onSave) onSave(); // callback opcional
      onClose();
      // Limpiar formulario
      setNombre(""); setDescripcion(""); setPrecio(""); setStock(""); setIdCategoria(""); setFiles([]); setPreviews([]);
    } catch (err) {
      console.error("Error creando producto:", err);
      toast.error("No se pudo crear el producto");
    }
  };

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white p-6 rounded-2xl w-full max-w-4xl relative overflow-y-auto max-h-[90vh] border border-gray-300 shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
      >
        <X className="w-6 h-6" />
      </button>

      <h2 className="text-2xl font-bold text-black mb-6">Crear Producto</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Información básica */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl space-y-4 ">
              <input
                type="text"
                placeholder="Nombre del Producto"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 bg-white text-black focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                placeholder="Descripción del producto"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                rows={4}
                className="w-full p-2 rounded-lg border border-gray-300 bg-white text-black focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="bg-white rounded-2xl">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  placeholder="Precio ($)"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white text-black focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white text-black focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
                                 
                <div className="flex items-start gap-10">
            {/* Bloque oferta */}
            <div className="flex flex-col min-h-[75px]">
                <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={oferta}
                    onChange={(e) => setOferta(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 pl-1.5">En oferta</span>
                </label>

                <input
                    type="number"
                    value={descuento}
                    min={0}
                    max={100}
                    onChange={(e) => setDescuento(parseInt(e.target.value) || 0)}
                    className={`mt-2 w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                        oferta ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                    placeholder="Descuento (%)"
                />
            </div>

            {/* Bloque destacado */}
            <label className="flex items-center">
                <input
                type="checkbox"
                checked={destacado}
                onChange={(e) => setDestacado(e.target.checked)}
                className="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 pl-1.5">Producto destacado</span>
            </label>
            </div>

                          
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            <div className="bg-white  space-y-4 ">
              <select
                value={idCategoria}
                onChange={e => setIdCategoria(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 bg-white text-black focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>

            <select
                value={tipoMascotaSeleccionado}
                onChange={e => setTipoMascotaSeleccionado(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 bg-white text-black focus:ring-2 focus:ring-purple-500"
                required
            >
                <option value="">Seleccionar tipo de mascota</option>
                {tiposMascota.map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                ))}
            </select>


              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500">
                <Upload className="w-8 h-8 text-gray-500 mb-2"/>
                <span className="text-gray-700 text-sm">Click o arrastra imágenes</span>
                <input type="file" multiple accept="image/*" onChange={handleFilesChange} className="hidden"/>
              </label>

              <div className="flex flex-wrap gap-2 mt-2">
                {previews.map((src,i) => (
                  <div key={i} className="relative w-24 h-24">
                    <img src={src} alt={`preview ${i}`} className="w-24 h-24 object-cover rounded-md"/>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviews(prev => prev.filter((_,index)=>index!==i));
                        setFiles(prev => prev.filter((_,index)=>index!==i));
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
                    >&times;</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500"
          >
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export default CrearProductoModal;
