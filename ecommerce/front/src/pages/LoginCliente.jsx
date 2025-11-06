import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginCliente() {
  const [modo, setModo] = useState("login"); // 'login' o 'registro'
  const navigate = useNavigate(); // ✅ Hook para redirigir

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await fetch("http://localhost:3000/api/clientes/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Cliente logueado:", data);

      if (res.ok && data) {
          localStorage.setItem("cliente", JSON.stringify(data));
          window.dispatchEvent(new Event("cliente-cambiado"));

        navigate("/");
      } else {
        alert(data.error || "Error al iniciar sesión con Google");
      }
    } catch (err) {
      console.error("Error login Google:", err);
      alert("Error al iniciar sesión con Google");
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-grow container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-teal-800 mb-8">
            {modo === "login" ? "Bienvenido" : "Crear cuenta"}
          </h2>

          {/* Tabs visuales */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setModo("login")}
              className={`flex-1 py-2 font-semibold border-b-2 transition ${
                modo === "login"
                  ? "text-teal-700 border-teal-700"
                  : "text-gray-500 hover:text-teal-700 border-transparent"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setModo("registro")}
              className={`flex-1 py-2 font-semibold border-b-2 transition ${
                modo === "registro"
                  ? "text-teal-700 border-teal-700"
                  : "text-gray-500 hover:text-teal-700 border-transparent"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formulario dinámico */}
          {modo === "login" ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <Link
                    to="/recuperar"
                    className="text-xs text-teal-600 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="button"
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
              >
                Iniciar Sesión
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre y apellido"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Crea una contraseña"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="button"
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
              >
                Crear cuenta
              </button>
            </form>
          )}

          {/* Mostrar Google Login solo si está en modo 'login' */}
          {modo === "login" && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-3 text-gray-500 text-sm">o</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log("Error al iniciar sesión con Google")}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
