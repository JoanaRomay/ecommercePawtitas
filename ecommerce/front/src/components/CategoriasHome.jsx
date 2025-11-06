// src/components/CategoriasHome.jsx
import React from "react";

const categorias = [
  { nombre: "Alimentos", img: "/img/categoriasHome/alimento.png" },
  { nombre: "Accesorios", img: "/img/categoriasHome/accesorios.png" },
  { nombre: "Juguetes", img: "/img/categoriasHome/juguetes.png" },
  { nombre: "Salud", img: "/img/categoriasHome/salud.png" },
];

export default function CategoriasHome() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {categorias.map((cat, index) => (
        <div
          key={index}
          className="relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-all"
        >
          {/* Imagen */}
          <img
            src={cat.img}
            alt={cat.nombre}
            className="w-full h-full object-cover"
          />

          {/* Overlay semi-transparente */}
          <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
            <h3 className="text-white font-semibold text-xl text-center px-2">
              {cat.nombre}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
