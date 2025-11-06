import React, { useEffect, useState, useRef } from "react";
import CardsProductos from "./CardsProductos";
import productoService from "../service/productoServiceEcommerce";
import categoriaService from "../service/categoriaService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MoveLeft, MoveRight } from "lucide-react"; // 👈 Íconos Lucide

export default function ProductosDestacados() {
  const swiperRef = useRef(null);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // 🔹 Traer productos destacados
  useEffect(() => {
    productoService
      .obtenerProductosDestacados()
      .then((data) => {
        console.log("Destacados obtenidos:", data);
        setProductos(data);
      })
      .catch((err) => console.error("Error obteniendo destacados:", err));
  }, []);

  // 🔹 Traer categorías
  useEffect(() => {
    categoriaService
      .obtenerCategorias()
      .then((data) => setCategorias(data))
      .catch(console.error);
  }, []);

  const categoriasMap = {};
  categorias.forEach((cat) => {
    categoriasMap[cat.id] = cat.nombre;
  });

  return (
    <div className="mt-10 relative mb-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] mb-4">
          Productos Destacados
        </h2>
        <span className="text-sm font-semibold px-4 py-2 rounded-full bg-[#FF6B6B] text-white shadow-md">
          ¡Los favoritos de nuestros clientes!
        </span>
      </div>

      {/* Carrusel */}
      <div className="w-[90%] mx-auto relative overflow-hidden">
        {/* Flecha izquierda */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-50 
                     w-10 h-10 bg-white text-[#1A535C] rounded-full 
                     shadow flex items-center justify-center 
                     hover:bg-[#1A535C] hover:text-white transition-all"
        >
          <MoveLeft size={22} />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-50 
                     w-10 h-10 bg-white text-[#1A535C] rounded-full 
                     shadow flex items-center justify-center 
                     hover:bg-[#1A535C] hover:text-white transition-all"
        >
          <MoveRight size={22} />
        </button>

        <Swiper
          className="destacadosSwiper"
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {productos.map((prod) => (
            <SwiperSlide key={prod.id} className="destacadosSlide">
              <CardsProductos
                id={prod.id}
                nombre={prod.nombre}
                precio={Number(prod.precio)}
                categoria={categoriasMap[prod.idCategoria] || "Sin categoría"}
                imagen={Array.isArray(prod.imgUrl) ? prod.imgUrl[0] : prod.imgUrl}
                destacado={prod.destacado}
                onAgregar={(producto) =>
                  window.dispatchEvent(
                    new CustomEvent("agregar-carrito", { detail: producto })
                  )
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
