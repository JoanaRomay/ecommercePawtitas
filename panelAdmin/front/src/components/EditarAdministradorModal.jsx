// EditarAdministradorModal.js
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

function EditarAdministradorModal({ isOpen, admin, onClose, onSave }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (admin) {
      setNombre(admin.nombre);
      setEmail(admin.email);
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email) return toast.error("Completa todos los campos");

    await onSave({ nombre, email });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md text-white relative">
              <button
  onClick={onClose}
  className="absolute top-4 right-4 text-gray-800 hover:text-gray-600"
>
  <X className="w-5 h-5" />
</button>

        <h2 className="text-xl font-semibold mb-4 text-black">Editar Administrador</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-black">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 rounded-md  text-black  border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1  text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md  text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarAdministradorModal;
