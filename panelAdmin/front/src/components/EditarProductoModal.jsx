import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getImgUrl } from '../helpers/getImgUrl.js';

function EditarProductoModal({ isOpen, onClose, producto, onSave, categorias = [] }) {
    // Estado del producto
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [tipoMascota, setTipoMascota] = useState("");
    const [oferta, setOferta] = useState(false);
    const [descuento, setDescuento] = useState(0);
    const [descripcion, setDescripcion] = useState("");
 const [destacado, setDestacado] = useState(false);

    // Imágenes
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    // Rellenar campos cuando cambie el producto
  useEffect(() => {
    if (!producto) return;

    setNombre(producto.nombre || "");
    setCategoria(String(producto.categoria?.id || producto.categoriaId || ""));
    setDescripcion(producto.descripcion || "");
    setPrecio(producto.precio || "");
    setStock(producto.stock || "");
    setTipoMascota(producto.tipoMascota || "");
    setOferta(!!producto.oferta);
    setDescuento(producto.descuento || 0);
    setDestacado(!!producto.destacado); // <-- Esto es clave

    let imagenes = [];
    try {
        imagenes = Array.isArray(producto.imgUrl)
            ? producto.imgUrl
            : JSON.parse(producto.imgUrl || '[]');
    } catch {
        imagenes = [];
    }

    setExistingImages(imagenes);
    setPreviews([]);
    setFiles([]);
}, [producto]);

    // Manejar archivos nuevos
    const handleFilesChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...selectedFiles]);
        const selectedPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...selectedPreviews]);
    };

    // Guardar cambios
 const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombre", nombre ?? "");
  formData.append("precio", parseFloat(precio) || 0);
  formData.append("stock", parseInt(stock) || 0);
  formData.append("idCategoria", parseInt(categoria) || 0);
  formData.append("tipoMascota", tipoMascota ?? "");
  formData.append("oferta", oferta ? "true" : "false");
  formData.append("descuento", oferta ? parseInt(descuento) : 0);
  formData.append("destacado", destacado ? "true" : "false"); // <- ESTA LÍNEA
  formData.append("descripcion", descripcion ?? "");

  files.forEach(file => formData.append("imagenes", file));
  formData.append("imagenesExistentes", JSON.stringify(existingImages));

  onSave(formData, producto.id);
};


    if (!isOpen) return null;




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
             <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
                <X className="w-5 h-5" />
            </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Producto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos principales */}
        <div className="grid grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={String(cat.id)}>{cat.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de mascota</label>
            <input
              type="text"
              value={tipoMascota}
              onChange={(e) => setTipoMascota(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

  <div className="flex items-start gap-10">
 {/* Sección oferta */}
<div className="flex flex-col min-h-[75px] justify-start">
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



  {/* Checkbox destacado */}
 <label className="flex items-center">
    <input
      type="checkbox"
      checked={destacado} // <-- usar el estado
      onChange={(e) => setDestacado(e.target.checked)}
      className="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
    />
    <span className="text-sm text-gray-700 pl-1.5">Producto destacado</span>
</label>

</div>

        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows={4}
          />
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Imágenes</label>
          <input
            type="file"
            multiple
            onChange={handleFilesChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4 file:rounded-lg
              file:border-0 file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100"
          />

          <div className="mt-2 flex flex-wrap gap-2">
            {existingImages.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={getImgUrl(src)}
                  alt={`Imagen ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => setExistingImages(prev => prev.filter((_, index) => index !== i))}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            {previews.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={src}
                  alt={`Vista previa ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFiles(prev => prev.filter((_, index) => index !== i));
                    setPreviews(prev => prev.filter((_, index) => index !== i));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botones */}
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

export default EditarProductoModal