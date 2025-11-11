import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
  const [mobileAbierto, setMobileAbierto] = useState(false);

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

      {/* 🔹 BUSCADOR - Siempre visible */}
      <div className="w-full md:w-auto flex justify-center">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar productos..."
          onChange={(e) => onBuscar && onBuscar(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: 280,
            backgroundColor: "#fff",
            borderRadius: "9999px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "9999px",
              fontSize: "0.9rem",
              "& fieldset": { borderColor: "#d1d5db" },
              "&:hover fieldset": { borderColor: "#14b8a6" },
              "&.Mui-focused fieldset": { borderColor: "#0d9488" },
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

      {/* 🔹 BOTÓN ACORDEÓN MOBILE - Solo visible en móvil */}
      <button 
        onClick={() => setMobileAbierto(!mobileAbierto)}
        className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-sm font-medium"
      >
        {mobileAbierto ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        Filtros y Categorías
      </button>

      {/* 🔹 CONTENIDO ACORDEÓN */}
      <div className={`w-full md:w-auto flex-col gap-4 ${mobileAbierto ? 'flex' : 'hidden'} md:flex md:flex-row md:items-center`}>

        {/* CATEGORÍAS - Grid en móvil, flex en desktop */}
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-3">
          {categorias.map((cat, index) => (
            <button
              key={cat.id || index}
              onClick={() => handleClick(cat.nombre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border text-center
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

        {/* FILTROS MASCOTAS */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="text-gray-700 font-medium text-sm">Mascota:</span>
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
      </div>
    </div>
  );
};

export default Categorias;