import { useState } from "react";
import { Mail } from 'lucide-react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      
      const data = await res.json();
      console.log("Token recibido:", data.token);
      console.log("Respuesta completa:", data);

      if (!res.ok) {
        setError(data.message || "Error en login");
      } else {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard"; // redirige al panel
      }
    } catch (err) {
      setError("Error de conexión");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
          <div className="w-full max-w-md  bg-[linear-gradient(135deg,rgb(19,19,20)_0%,rgb(15,15,17)_100%)] border border-gray-900 shadow-lg backdrop-blur-sm p-6 rounded-lg">
               <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-purple-300 text-center">
      Bienvenido
              </h1>
               <p className="text-gray-400 text-center mt-2">Ingresa tus credenciales para acceder</p>
      <form
        onSubmit={handleLogin}
         className=" space-y-4 mt-6"
      >
        

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div>
          <label className="block text-gray-100 text-sm font-medium mb-1">Correo electrónico:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
           className="w-full p-3 pl-10 bg-[rgb(24,23,26)] border border-[rgba(24,23,26,1)] rounded text-gray-100 focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
          />
        </div>

        <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             className="w-full p-3 pl-10 bg-[rgb(24,23,26)] border border-[rgba(24,23,26,1)] rounded text-gray-100 focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-gradient-to-br from-purple-800 to-purple-300 text-white font-semibold hover:from-purple-700 hover:to-purple-500 transition-colors"
        >
          {loading ? "Ingresando..." : "Ingresar"}
                  </button>
      

      </form>
          </div>
      </div>
  );
}

export default Login;
