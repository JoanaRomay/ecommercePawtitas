import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";
import { ShoppingCart, Heart, Share2, Minus, Plus, Truck, Clock, Globe } from "lucide-react";
import toast from "react-hot-toast";
;

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
    <div className="min-h-screen p-8">
      <div className="bg-white rounded-3xl w-full max-w-7xl mx-auto shadow-lg p-10 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-max">
              {imagenes.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000${img}`}
                  alt={`${producto.nombre} ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-contain rounded-xl cursor-pointer border-2 shadow-sm transition-all duration-200 hover:scale-105 ${
                    mainImage === img
                      ? "border-teal-600 shadow-teal-100"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="flex-1 flex justify-start items-start">
              <img
                src={`http://localhost:3000${mainImage}`}
                alt={producto?.nombre || "Producto"}
                className="w-96 h-96 md:w-[450px] md:h-[450px] rounded-2xl object-cover shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{producto.nombre}</h1>
              <p className="text-4xl font-bold text-teal-600 mb-6">${precioFinal.toFixed(2)}</p>
              <p className="text-gray-600 font-medium mb-8">
                <span className="text-gray-900 font-semibold">Stock disponible:</span> {producto.stock}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-800">Cantidad:</span>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 py-3 text-lg text-gray-800 font-semibold">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-colors disabled:opacity-50"
                    disabled={quantity >= producto.stock}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-md transition-transform duration-200 hover:scale-[1.02]"
                >
                  <ShoppingCart className="w-6 h-6" /> Agregar al carrito
                </button>

                <button className="bg-white border border-gray-300 rounded-2xl p-4 hover:bg-gray-100 transition-colors shadow-sm">
                  <Heart className="w-6 h-6 text-teal-600" />
                </button>

                <button className="bg-white border border-gray-300 rounded-2xl p-4 hover:bg-gray-100 transition-colors shadow-sm">
                  <Share2 className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              <div className="mt-16 flex flex-col sm:flex-row sm:flex-wrap gap-4 text-gray-700 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-teal-600" />
                  ¡Envío gratis en CABA y zonas de GBA* a partir de $33.000!
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Recibí en el día en CABA y GBA (de lunes a viernes hasta las 12hs)
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-600" />
                  ¡Envíos a todo el país! Bonificados hasta 100% según zona y monto de compra
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descripción del producto</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{producto.descripcion}</p>
        </div>

        <div className="mt-10 bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-100">
          <h2 className="text-2xl font-semibold mb-5 text-gray-800">Preguntas y comentarios</h2>

          {mensajes.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay mensajes todavía. Sé el primero en preguntar.</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {mensajes.map(mensaje => (
                <div
                  key={mensaje.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-800">{mensaje.texto}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={nuevoMensaje}
              onChange={e => setNuevoMensaje(e.target.value)}
              placeholder="Escribí tu mensaje..."
              className="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-800"
            />
            <button
              onClick={enviarMensaje}
              className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors font-semibold"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
