import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";
import { ShoppingCart, Heart, Share2, Minus, Plus, Truck, Clock, Globe } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mainImage, setMainImage] = useState("/placeholder.webp");
  const [imagenes, setImagenes] = useState(["/placeholder.webp"]);

  useEffect(() => {
    API.get(`/productos/${id}`)
      .then(res => {
        const data = res.data;
        setProducto(data);

        let imgs = [];
        if (Array.isArray(data.imgUrl)) {
          imgs = data.imgUrl;
        } else {
          try {
            imgs = JSON.parse(data.imgUrl);
            if (!Array.isArray(imgs)) imgs = [data.imgUrl];
          } catch {
            imgs = [data.imgUrl || "/placeholder.webp"];
          }
        }
        setImagenes(imgs);
        setMainImage(imgs[0] || "/placeholder.webp");
      })
      .catch(err => console.error("Error al cargar producto:", err));

    API.get(`/productos/${id}/mensajes`)
      .then(res => setMensajes(res.data))
      .catch(err => console.error("Error al cargar mensajes:", err));
  }, [id]);

  const increaseQuantity = () => setQuantity(q => Math.min(q + 1, producto?.stock || 1));
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (!producto) return;

    if (quantity > producto.stock) {
      toast.error("No hay suficiente stock disponible", { autoClose: 3000 });
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carritoActual.find(item => item.id === producto.id);
    const primeraImagen = mainImage;
    let nuevoCarrito;

    if (existe) {
      if (existe.cantidad + quantity > producto.stock) {
        toast.error("No hay suficiente stock disponible", { autoClose: 3000 });
        return;
      }
      nuevoCarrito = carritoActual.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + quantity }
          : item
      );
    } else {
      nuevoCarrito = [...carritoActual, { ...producto, cantidad: quantity, imagen: primeraImagen }];
    }

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("storage"));
    toast.success("Producto agregado al carrito", { autoClose: 2000 });
  };

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim()) return;
    API.post(`/productos/${id}/mensajes`, { texto: nuevoMensaje })
      .then(res => {
        setMensajes(prev => [...prev, res.data]);
        setNuevoMensaje("");
      })
      .catch(err => console.error("Error al enviar mensaje:", err));
  };

  if (!producto) {
    return <p className="text-center mt-10 text-xl text-gray-600">Cargando producto...</p>;
  }

  const precioFinal = Number(producto.precio) || 0;

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-7xl mx-auto shadow-lg p-4 sm:p-6 md:p-10 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          
          {/* SECCIÓN IMÁGENES - Mejorada para mobile */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Miniaturas - Horizontal en mobile, vertical en desktop */}
            <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
              {imagenes.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000${img}`}
                  alt={`${producto.nombre} ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg sm:rounded-xl cursor-pointer border-2 shadow-sm transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                    mainImage === img
                      ? "border-teal-600 shadow-teal-100"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Imagen principal - Centrada en mobile */}
            <div className="flex-1 flex justify-center items-start order-1 sm:order-2">
              <img
                src={`http://localhost:3000${mainImage}`}
                alt={producto?.nombre || "Producto"}
                className="w-full max-w-sm sm:max-w-md md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-xl md:rounded-2xl object-cover shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* SECCIÓN INFORMACIÓN - Mejorada para mobile */}
          <div className="flex flex-col justify-between space-y-6 md:space-y-0">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {producto.nombre}
              </h1>
              <p className="text-3xl sm:text-4xl font-bold text-teal-600">${precioFinal.toFixed(2)}</p>
              <p className="text-gray-600 font-medium">
                <span className="text-gray-900 font-semibold">Stock disponible:</span> {producto.stock}
              </p>
            </div>

            <div className="space-y-6">
              {/* Selector de cantidad */}
              <div className="flex items-center space-x-4">
                <span className="text-base sm:text-lg font-medium text-gray-800 whitespace-nowrap">Cantidad:</span>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="px-4 sm:px-5 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg text-gray-800 font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-4 sm:px-5 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-colors disabled:opacity-50"
                    disabled={quantity >= producto.stock}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[200px] bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 sm:py-4 rounded-xl md:rounded-2xl text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 shadow-md transition-transform duration-200 hover:scale-[1.02]"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" /> 
                  Agregar al carrito
                </button>

                <div className="flex gap-2 sm:gap-3">
                  <button className="bg-white border border-gray-300 rounded-xl md:rounded-2xl p-3 sm:p-4 hover:bg-gray-100 transition-colors shadow-sm">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                  </button>

                  <button className="bg-white border border-gray-300 rounded-xl md:rounded-2xl p-3 sm:p-4 hover:bg-gray-100 transition-colors shadow-sm">
                    <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Información de envío - Mejorada para mobile */}
              <div className="mt-8 md:mt-16 space-y-3 text-gray-700 text-sm">
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">¡Envío gratis en CABA y zonas de GBA* a partir de $33.000!</span>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Recibí en el día en CABA y GBA (de lunes a viernes hasta las 12hs)</span>
                </div>

                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">¡Envíos a todo el país! Bonificados hasta 100% según zona y monto de compra</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción del producto */}
        <div className="mt-8 md:mt-12 border-t border-gray-200 pt-6 md:pt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">Descripción del producto</h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{producto.descripcion}</p>
        </div>

        {/* Preguntas y comentarios */}
        <div className="mt-8 md:mt-10 bg-gray-50 p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-inner border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-5 text-gray-800">Preguntas y comentarios</h2>

          {mensajes.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay mensajes todavía. Sé el primero en preguntar.</p>
          ) : (
            <div className="space-y-3 max-h-48 sm:max-h-64 overflow-y-auto pr-2">
              {mensajes.map(mensaje => (
                <div
                  key={mensaje.id}
                  className="bg-white p-3 sm:p-4 rounded-lg md:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-800 text-sm sm:text-base">{mensaje.texto}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={nuevoMensaje}
              onChange={e => setNuevoMensaje(e.target.value)}
              placeholder="Escribí tu mensaje..."
              className="flex-1 border border-gray-300 p-3 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-800 text-sm sm:text-base"
            />
            <button
              onClick={enviarMensaje}
              className="bg-teal-600 text-white px-4 sm:px-6 py-3 rounded-lg md:rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm sm:text-base"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}