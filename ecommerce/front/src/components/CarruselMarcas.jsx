import React from "react";

export default function CarruselMarcas() {
  const marcas = [
    "/img/marcas/catchow.webp",
    "/img/marcas/eukanuba.webp",
    "/img/marcas/excellent.webp",
    "/img/marcas/proplan.webp",
    "/img/marcas/royalcanin.webp",
  ];

  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {[...marcas, ...marcas].map((img, i) => (
          <div key={i} className="logo">
            <img src={img} alt={`Marca ${i}`} />
          </div>
        ))}
      </div>

      <div className="scroll-content">
        {[...marcas, ...marcas].map((img, i) => (
          <div key={`dup-${i}`} className="logo">
            <img src={img} alt={`Marca duplicada ${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
