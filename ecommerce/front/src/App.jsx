import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* Contenedor global del toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "1rem",
          },
          success: {
            style: { background: "#16a34a" }, // verde
          },
          error: {
            style: { background: "#dc2626" }, // rojo
          },
        }}
      />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
