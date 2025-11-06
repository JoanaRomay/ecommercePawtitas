import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Está seguro que desea cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      confirmButtonColor: "#6b21a8", // violeta (tailwind: purple-600)
      cancelButtonColor: "#6b7280", // gris (tailwind: gray-500)
      
    });

    if (result.isConfirmed) {
      // 1. Limpiar sesión
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 2. Mensaje de confirmación
      toast.success("Sesión cerrada correctamente");

      // 3. Redirigir
      navigate("/");
    }
  };

  return (
    <div className="h-20 bg-gradient-to-r from-purple-800 to-purple-600 flex items-center justify-between pl-14 pr-14">
      <h1 className="font-bold text-xl text-white">Panel de Administración</h1>

      <div>
        <button
          onClick={handleLogout}
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
