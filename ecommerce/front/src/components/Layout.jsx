import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar fijo */}
      <Navbar />

      {/* Espaciador igual al alto del navbar */}
      <div className="h-20 md:h-24"></div>

      {/* Contenido de la página */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
