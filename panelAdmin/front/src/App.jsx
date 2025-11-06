import { BrowserRouter, Routes, Route } from "react-router"
import Dashboard from "./pages/Dashboard"
import Productos from "./pages/Productos"
import CrearProducto from "./pages/CrearProducto"
import Categorias from "./pages/Categorias"
import NuevaCategoria from "./pages/NuevaCategoria"
import Ordenes from "./pages/Ordenes"
import CategoriaEditar from "./pages/CategoriaEditar"
import Administradores from "./pages/Administradores";
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import './index.css';
import GoogleCallback from "./pages/GoogleCallback";
import { Toaster } from 'react-hot-toast';
import Clientes from "./pages/Clientes";


function App() {
  
  return (
      <>
          
    {/* Toaster global para los toasts */}
      <Toaster position="top-right" reverseOrder={false} />

          <BrowserRouter>
  <Routes>
    {/* Ruta pública */}
    <Route path="/" element={<Login />} />
      {/* Ruta para Google login callback */}
    <Route path="/google/callback" element={<GoogleCallback />} />
                  
    {/* Rutas privadas */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/crearProducto" element={<CrearProducto />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/categorias/nuevaCategoria" element={<NuevaCategoria />} />
      <Route path="/ordenes" element={<Ordenes />} />
      <Route path="/categorias/CategoriaEditar" element={<CategoriaEditar />} />
      <Route path="/administradores" element={<Administradores />} />
      <Route path="/clientes" element={<Clientes />} />

    </Route>
  </Routes>
</BrowserRouter>

    </>
  )
}

export default App
