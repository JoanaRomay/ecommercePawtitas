import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Productos from "../pages/Productos";
import Contacto from "../pages/Contacto";
import Nosotros from "../pages/Nosotros";
import ProductoDetalle from "../components/ProductoDetalle";
import MejorValorado from "../pages/MejorValorado";
import LoginCliente from "../pages/LoginCliente";
import Layout from "../components/Layout";
import PerfilCliente from "../pages/PerfilCliente";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/productos" element={<Layout><Productos /></Layout>} />
      <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
      <Route path="/nosotros" element={<Layout><Nosotros /></Layout>} />
      <Route path="/productos/:id" element={<Layout><ProductoDetalle /></Layout>} />
      <Route path="/mejor-valorados" element={<Layout><MejorValorado /></Layout>} />
          <Route path="/login-cliente" element={<Layout><LoginCliente /></Layout>} />
          <Route path="/perfil" element={<Layout><PerfilCliente /></Layout>} />

    </Routes>
  );
};

export default AppRoutes;
