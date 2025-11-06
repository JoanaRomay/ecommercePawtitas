import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"

function Ordenes() {


   return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex flex-1">
        <SideBar />

              <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
                  <div className="flex justify-between items-center">
                      <h2 className="text-white text-3xl font-bold leading-none">Ordenes</h2>
                   
                  </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
  {/* Header */}
  <div className="px-6 py-4 border-b border-gray-100">
    <h2 className="text-lg font-semibold">Todas las Órdenes</h2>
    <p className="text-sm text-gray-500">Lista completa de órdenes de compra</p>

    <div className="flex items-center space-x-2 mt-4">
      <div className="relative flex-1 max-w-sm">
        <span className="absolute left-2 top-2.5 h-4 w-4 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Buscar órdenes..."
          className="pl-8 w-full rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <select className="w-40 rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option>Todos</option>
        <option>Pendiente</option>
        <option>Procesando</option>
        <option>Enviado</option>
        <option>Entregado</option>
        <option>Cancelado</option>
      </select>
    </div>
  </div>

  {/* Table */}
  <div className="px-6 py-4 overflow-x-auto">
    <table className="w-full text-sm text-left border-collapse">
      <thead className="border-b">
        <tr>
          <th className="py-2 px-3 font-medium">Orden</th>
          <th className="py-2 px-3 font-medium">Cliente</th>
          <th className="py-2 px-3 font-medium">Items</th>
          <th className="py-2 px-3 font-medium">Total</th>
          <th className="py-2 px-3 font-medium">Estado</th>
          <th className="py-2 px-3 font-medium">Fecha</th>
          <th className="py-2 px-3 font-medium text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {/* Ejemplo de fila */}
        <tr>
          <td className="py-3 px-3">
            <div className="font-medium">#1234</div>
            <div className="text-sm text-gray-500">Tarjeta</div>
          </td>
          <td className="py-3 px-3">
            <div className="font-medium">Juan Pérez</div>
            <div className="text-sm text-gray-500">juan@example.com</div>
          </td>
          <td className="py-3 px-3">
            <span className="px-2 py-1 text-xs rounded-full border">3 items</span>
          </td>
          <td className="py-3 px-3 font-medium">$120.00</td>
          <td className="py-3 px-3">
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
              Pendiente
            </span>
          </td>
          <td className="py-3 px-3">2025-09-10</td>
          <td className="py-3 px-3 text-right">
            <button className="px-2 py-1 text-sm rounded-2xl border hover:bg-gray-100">
              Ver detalles
            </button>
          </td>
        </tr>

        {/* Podés copiar y pegar esta fila para simular más órdenes */}
      </tbody>
    </table>
  </div>
</div>
        



           
        </main>
      </div>
    </div>
  )
}

export default Ordenes