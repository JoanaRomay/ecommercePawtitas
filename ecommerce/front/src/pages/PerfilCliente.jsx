import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { Mail, Phone, MapPin, Home, Calendar, Map, User, Package, Truck, CreditCard } from "lucide-react";

export default function PerfilCliente() {
  const navigate = useNavigate();
  const clienteGuardado = JSON.parse(localStorage.getItem("cliente")) || {};

  const [userData, setUserData] = useState({
    nombre: clienteGuardado.cliente?.nombre || "",
    email: clienteGuardado.cliente?.email || "",
    telefono: clienteGuardado.cliente?.telefono || "",
    direccion: clienteGuardado.cliente?.direccion || "",
    ciudad: clienteGuardado.cliente?.ciudad || "",
    provincia: clienteGuardado.cliente?.provincia || "",
    codigoPostal: clienteGuardado.cliente?.codigoPostal || "",
    fechaNacimiento: clienteGuardado.cliente?.fechaNacimiento || "",
    genero: clienteGuardado.cliente?.genero || "",
  });

  const [editData, setEditData] = useState({ ...userData });
  const [isEditing, setIsEditing] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const id = clienteGuardado?.cliente?.id || clienteGuardado?.id;
    if (!id) return;

    // Cargar datos del cliente
    fetch(`http://localhost:3000/api/clientes/${id}`)
      .then(res => res.json())
      .then(data => {
        const updated = {
          nombre: data.nombre || "",
          email: data.email || "",
          telefono: data.telefono || "",
          direccion: data.direccion || "",
          ciudad: data.ciudad || "",
          provincia: data.provincia || "",
          codigoPostal: data.codigoPostal || "",
          fechaNacimiento: data.fechaNacimiento ? data.fechaNacimiento.split("T")[0] : "",
        };
        setUserData(updated);
        setEditData(updated);
      })
      .catch(err => console.error("Error al obtener cliente:", err));

    // Simulación de pedidos (mock)
    const pedidosMock = [
      {
        id: 1,
        fecha: "2025-10-28",
        total: 15200,
        estado: "Entregado",
        metodoPago: "Tarjeta de crédito",
        productos: [
          { nombre: "Bolsa de alimento balanceado", cantidad: 1 },
          { nombre: "Juguete mordedor", cantidad: 2 },
        ],
      },
      {
        id: 2,
        fecha: "2025-09-14",
        total: 8700,
        estado: "En camino",
        metodoPago: "Mercado Pago",
        productos: [{ nombre: "Pipeta antipulgas", cantidad: 1 }],
      },
    ];
    setPedidos(pedidosMock);
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const id = clienteGuardado.cliente?.id || clienteGuardado.id;
      const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      setUserData(data);
      setIsEditing(false);
      localStorage.setItem("cliente", JSON.stringify({ cliente: data }));
      alert("Cambios guardados correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar cambios");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cliente");
    navigate("/");
  };

  const iconMap = {
    email: Mail,
    telefono: Phone,
    direccion: MapPin,
    ciudad: Map,
    provincia: Home,
    codigoPostal: User,
    fechaNacimiento: Calendar,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-6">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-bold text-gray-800">Mi Perfil</h1>
            
            </div>

          {/* Perfil */}
<div className="bg-white shadow-xl rounded-2xl p-10 space-y-10 transition-all duration-300 hover:shadow-2xl">
  {/* Encabezado */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b pb-6">
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-5xl font-semibold text-white uppercase shadow-md">
          {userData.nombre ? userData.nombre[0] : "?"}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md">
          <span className="block h-3 w-3 rounded-full bg-green-500"></span>
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-bold text-gray-800">{userData.nombre || "Usuario"}</h2>
        <p className="text-gray-500">{userData.email}</p>
      </div>
    </div>

    {!isEditing && (
      <button
        onClick={handleEdit}
        className="flex items-center gap-2 px-6 py-3 border border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-50 hover:text-teal-700 transition text-lg"
      >
        ✏️ Editar Perfil
      </button>
    )}
  </div>

  {/* Información del usuario */}
  {!isEditing ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-4">
      {Object.keys(userData).map((key) => {
        if (!iconMap[key]) return null;
        const Icon = iconMap[key];
        return (
          <div key={key} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <Icon className="h-6 w-6 text-teal-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              <p className="text-lg text-gray-800 font-medium">{userData[key] || "—"}</p>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="space-y-6 mt-6">
      {Object.keys(editData).map((key) => {
        if (!iconMap[key]) return null;
        const Icon = iconMap[key];
        return (
          <div key={key} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-3 w-full sm:w-1/3">
              <Icon className="h-5 w-5 text-teal-600" />
              <label className="text-gray-700 font-medium capitalize">{key}</label>
            </div>
            <input
              className="flex-1 border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
              type={key === "email" ? "email" : key === "fechaNacimiento" ? "date" : "text"}
              placeholder={key}
              value={editData[key] || ""}
              onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
            />
          </div>
        );
      })}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t mt-8">
        <button
          onClick={handleCancel}
          className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition text-lg font-medium"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-lg font-medium"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  )}
</div>

            {/* Pedidos recientes */}
            <div className="bg-white shadow-lg rounded-xl p-10">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <Package className="text-teal-600" /> Mis pedidos recientes
              </h2>
              {pedidos.length > 0 ? (
                <div className="space-y-6">
                  {pedidos.map(pedido => (
                    <div
                      key={pedido.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-lg font-semibold text-gray-800">
                          Pedido #{pedido.id}
                        </p>
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            pedido.estado === "Entregado"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {pedido.estado}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Fecha: <span className="font-medium">{pedido.fecha}</span>
                      </p>
                      <p className="text-gray-600">
                        Método de pago: <span className="font-medium">{pedido.metodoPago}</span>
                      </p>
                      <p className="text-gray-600 mt-2 font-semibold">Productos:</p>
                      <ul className="list-disc list-inside text-gray-700 ml-4">
                        {pedido.productos.map((prod, idx) => (
                          <li key={idx}>{prod.nombre} x{prod.cantidad}</li>
                        ))}
                      </ul>
                      <p className="mt-3 text-lg font-bold text-teal-600">
                        Total: ${pedido.total.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-lg">No hay pedidos registrados aún.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
