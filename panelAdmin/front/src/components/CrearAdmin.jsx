import { useEffect, useState } from "react";
import rolService from "../services/rolService";
import usuarioService from "../services/usuarioService";
import toast from "react-hot-toast";

export default function CrearAdmin({ onClose, onCreated }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rolId, setRolId] = useState("");
  const [roles, setRoles] = useState([]);

  // Traer roles al montar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await rolService.getAll();
        if (res.data.success) {
          setRoles(res.data.data);
        }
      } catch (err) {
        console.error("Error al traer roles:", err);
        toast.error("No se pudieron cargar los roles");
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rolId) return toast.error("Debe seleccionar un rol");

    // 👉 Definimos los datos que se van a enviar
    const datos = {
      nombre,
      email,
      password,
      rolId,
    };

    try {
      await usuarioService.create(datos);
      toast.success("Usuario creado correctamente");

      if (onCreated) onCreated(); // refresca la lista si viene del padre
      onClose(); // cierra el modal
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error al crear usuario");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">Crear Administrador</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full rounded-lg border p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select
              value={rolId}
              onChange={(e) => setRolId(e.target.value)}
              className="mt-1 block w-full rounded-lg border p-2"
              required
            >
              <option value="">Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.codigo}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
