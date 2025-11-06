import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function BannerSwiper() {
  const banners = [
    {
      img: "/img/banner/imgBanner1.jpg",
      title: "Lo mejor para tu mascota en un solo lugar",
      text: "Encuentra alimentos premium, juguetes divertidos y accesorios de calidad para tus compañeros peludos.",
    },
    {
      img: "/img/banner/imgBanner2.jpeg",
      title: "Productos de calidad para tu mejor amigo",
      text: "Seleccionamos los mejores productos para garantizar la salud y felicidad de tus mascotas.",
    },
    {
      img: "/img/banner/imgBanner3.jpg",
      title: "Todo lo que necesitas para su cuidado",
      text: "Desde alimentos hasta accesorios, tenemos todo para el bienestar de tus mascotas.",
    },
  ];

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper rounded-xl overflow-hidden"
    >
      {banners.map((banner, i) => (
        <SwiperSlide key={i}>
          <div className="relative w-full">
            {/* Imagen */}
            <img
              src={banner.img}
              alt={`Banner ${i + 1}`}
              className="w-full h-full object-cover object-[center_45%]"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Contenido centrado verticalmente */}
            <div
              className="
                absolute inset-0 flex flex-col justify-center z-20
                px-6 sm:px-10 md:ml-40
                max-w-2xl space-y-4
                text-start
                items-start
              "
            >
              <h2 className="text-white text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {banner.title}
              </h2>
              <p className="text-white text-xl sm:text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed">
                {banner.text}
              </p>

              {/* Botones */}
              <div className="flex sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
                <button className="bg-teal-600 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-lg hover:opacity-90 transition">
                  Ver productos
                </button>
                <button className="bg-white text-teal-600 font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-lg hover:bg-teal-600 hover:text-white transition">
                  Ofertas especiales
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
