import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const Categorias = ({
  categorias,
  categoriaSeleccionada,
  onCategoriaChange,
  onBuscar,
  onMascotaChange,
}) => {
  const [seleccion, setSeleccion] = useState(categoriaSeleccionada || "Todos");
  const [mascotas, setMascotas] = useState({
    Perro: false,
    Gato: false,
  });

  useEffect(() => {
    if (categoriaSeleccionada !== seleccion) {
      setSeleccion(categoriaSeleccionada);
    }
  }, [categoriaSeleccionada, seleccion]);

  const handleClick = (cat) => {
    setSeleccion(cat);
    if (onCategoriaChange) onCategoriaChange(cat);
  };

  const handleMascotaChange = (tipo) => {
    const nuevosFiltros = { ...mascotas, [tipo]: !mascotas[tipo] };
    setMascotas(nuevosFiltros);
    const activos = Object.keys(nuevosFiltros).filter((k) => nuevosFiltros[k]);
    if (onMascotaChange) onMascotaChange(activos);
  };

  return (
   <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-5 bg-gradient-to-r from-white via-gray-50 mt-10 to-white p-6 mb-8 w-full max-w-[80%] mx-auto rounded-2xl shadow-md border border-gray-100">

      {/* Sección Categorías */}
      <div className="flex flex-wrap justify-center gap-2">
        {categorias.map((cat, index) => (
          <button
            key={cat.id || index}
            onClick={() => handleClick(cat.nombre)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border
              ${
                seleccion === cat.nombre
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm hover:bg-teal-700"
                  : "bg-white text-gray-700 border-gray-300 hover:border-teal-400 hover:text-teal-700"
              }`}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Filtros por tipo de mascota */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <span className="text-gray-700 font-medium">Mascota:</span>
        {["Perro", "Gato"].map((tipo) => (
          <button
            key={tipo}
            onClick={() => handleMascotaChange(tipo)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
              ${
                mascotas[tipo]
                  ? "bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200"
                  : "bg-white text-gray-600 border-gray-300 hover:border-teal-400 hover:text-teal-700"
              }`}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="w-full md:w-auto flex justify-center">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar productos..."
          onChange={(e) => onBuscar && onBuscar(e.target.value)}
          sx={{
            width: 240,
            backgroundColor: "#fff",
            borderRadius: "9999px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "9999px",
              fontSize: "0.9rem",
              "& fieldset": {
                borderColor: "#d1d5db",
              },
              "&:hover fieldset": {
                borderColor: "#14b8a6",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0d9488",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Categorias;
