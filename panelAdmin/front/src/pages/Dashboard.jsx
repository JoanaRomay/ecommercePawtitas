import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { TrendingUp, ShoppingBag, Clock, DollarSign, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const irACrearProducto = () => navigate("/productos/crearProducto");

  // 📊 Datos falsos de ventas semanales
  const [ventas, setVentas] = useState([
    { dia: "Lun", ventas: 8 },
    { dia: "Mar", ventas: 12 },
    { dia: "Mié", ventas: 6 },
    { dia: "Jue", ventas: 15 },
    { dia: "Vie", ventas: 10 },
    { dia: "Sáb", ventas: 20 },
    { dia: "Dom", ventas: 14 },
  ]);

  // 🔢 Datos simulados del resumen
  const resumen = [
    { titulo: "Total de productos", valor: 128, icon: <ShoppingBag className="h-8 w-8 text-purple-400" /> },
    { titulo: "Pedidos hoy", valor: 12, icon: <Clock className="h-8 w-8 text-blue-400" /> },
    { titulo: "Pendientes", valor: 5, icon: <TrendingUp className="h-8 w-8 text-yellow-400" /> },
    { titulo: "Ventas hoy", valor: "$1.240", icon: <DollarSign className="h-8 w-8 text-green-400" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />

        <main className="bg-[rgb(19,19,20)] flex-1 p-10 overflow-y-auto">
          <h2 className="bg-gradient-to-br from-purple-700 to-purple-300 bg-clip-text text-transparent text-3xl font-bold mb-8">
            Dashboard
          </h2>

          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {resumen.map((item, i) => (
              <div
                key={i}
                className="bg-[rgb(36,36,41)] rounded-2xl p-5 text-white flex items-center justify-between shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <div>
                  <p className="text-sm text-gray-400">{item.titulo}</p>
                  <h3 className="text-2xl font-bold mt-1">{item.valor}</h3>
                </div>
                {item.icon}
              </div>
            ))}
          </div>

          {/* Gráfico de ventas semanales */}
          <div className="bg-[rgb(36,36,41)] rounded-2xl p-6 mb-10 text-white shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="text-purple-400" /> Ventas de la última semana
            </h3>

            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={ventas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3b3b3b" />
                  <XAxis dataKey="dia" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#222", border: "none" }} />
                  <Line type="monotone" dataKey="ventas" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="bg-[rgb(36,36,41)] rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-white mb-5">Acciones rápidas</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={irACrearProducto}
                className="flex-1 bg-purple-700 hover:bg-purple-600 text-white font-bold py-4 rounded-lg transition-all"
              >
                + Nuevo Producto
              </button>
              <button className="flex-1 bg-purple-700 hover:bg-purple-600 text-white font-bold py-4 rounded-lg transition-all">
                Ver Pedidos
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
