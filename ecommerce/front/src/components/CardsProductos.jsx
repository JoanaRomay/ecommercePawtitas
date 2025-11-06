
import { Eye, ShoppingCart  } from 'lucide-react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function CardsProductos({
  id,
  nombre,
  precio,
  categoria,
  imagen,
  oferta,
  descuento,
  extraInfo,
}) {
  const navigate = useNavigate();

  // === Imagen principal ===
  let imagenPrincipal = '/placeholder.webp';
  if (Array.isArray(imagen)) imagenPrincipal = imagen[0] || '/placeholder.webp';
  else if (typeof imagen === 'string' && imagen.trim() !== '') imagenPrincipal = imagen;

  const imagenPrincipalURL = imagenPrincipal.startsWith('http')
    ? imagenPrincipal
    : `http://localhost:3000${imagenPrincipal}`;

  // === Precio con descuento ===
  const precioNum = Number(precio) || 0;
  const descuentoNum = Number(descuento) || 0;
  const precioDescuento = descuentoNum > 0 ? precioNum * (1 - descuentoNum / 100) : precioNum;

  // === Función para ir a detalle ===
  const irADetalle = () => navigate(`/productos/${id}`);

  // === Función central de agregar al carrito ===
const agregarAlCarrito = () => {
  const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

  const existe = carritoActual.find(item => item.id === id);
  let nuevoCarrito;

  if (existe) {
    nuevoCarrito = carritoActual.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
  } else {
    nuevoCarrito = [
      ...carritoActual,
      {
        id,
        nombre,
        precio,
        categoria,
        imagen: imagenPrincipal,
        oferta,
        descuento,
        cantidad: 1,
      },
    ];
  }

  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  window.dispatchEvent(new Event('storage'));

 toast.success(`Producto agregado al carrito`, { autoClose: 2000 });

};

  return (
    <section className="flex flex-col rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-[356px]">
  {/* Imagen */}
  <figure className="relative w-full bg-white h-64 flex items-start justify-center overflow-hidden group">
  <img
    src={imagenPrincipalURL}
    alt={nombre}
    className="h-full object-cover rounded-t-md transition-transform duration-500 ease-in-out group-hover:scale-110"
    onError={(e) => (e.currentTarget.src = '/placeholder.webp')}
  />

  {oferta && (
    <span className="absolute top-3 left-3 bg-[#FF6B6B] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
      -{descuentoNum}%
    </span>
  )}

  {categoria && (
    <span className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
      {categoria}
    </span>
  )}
</figure>


  {/* Info */}
  <div className="p-4 bg-white  flex flex-col justify-between flex-grow">
    <header>
      <h2 className="text-center font-light text-3xl sm:text-xl mb-2">
        {nombre}
      </h2>
    </header>

    <div className="text-center mb-2">
      {descuentoNum > 0 ? (
        <>
          <p className="text-gray-400 line-through text-sm">${precioNum.toFixed(2)}</p>
          <p className="text-lg sm:text-2xl font-semibold text-gray-900">${precioDescuento.toFixed(2)}</p>
        </>
      ) : (
        <p className="text-lg sm:text-2xl font-semibold text-gray-900">${precioNum.toFixed(2)}</p>
      )}
    </div>

    {extraInfo && (
      <p className="text-center text-gray-500 text-sm mb-2">{extraInfo}</p>
    )}

    {/* Botones */}
  <div className="flex justify-center items-center mt-3 gap-3">
  {/* Botón Ver Detalle */}
  <button
    onClick={irADetalle}
    className="flex items-center justify-center gap-2 border border-teal-600 text-teal-600 font-medium py-2 px-3 rounded-md w-full max-w-[120px] text-sm transition-all duration-200 hover:bg-teal-600 hover:text-white"
  >
    <Eye className="w-4 h-4" />
    Ver
  </button>

  {/* Botón Agregar al Carrito */}
  <button
    onClick={agregarAlCarrito}
    className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-3 rounded-md w-full max-w-[160px] text-sm transition-all duration-200"
  >
    <ShoppingCart className="w-5 h-5" />
    Agregar
  </button>
</div>

  </div>
</section>

  );
}
