import { useState, useRef, useEffect } from "react";
import {  Dog, Send } from "lucide-react";
import API from "../service/api";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! 👋 Soy PawBot, el asistente de Pawtitas Petshop. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Horarios de atención",
    "Dónde estamos",
    "Hacen envíos?",
    
  ];

  const respuestas = {
    "Horarios de atención": "Atendemos de lunes a sábado de 9 a 20 hs. Los domingos de 10 a 14 hs 🕓",
    "Dónde estamos": "Estamos en Av. Corrientes 456, CABA. ¡Te esperamos con tu mascota! 📍",
    "Hacen envíos?": "Sí, realizamos envíos en toda la ciudad y alrededores. Gratis a partir de $30.000 🚚",
    
  };

  const handleQuickReply = (text) => {
    const userMsg = { role: "user", content: text };
    const botMsg = { role: "assistant", content: respuestas[text] || "¡Gracias por tu consulta! 🐾" };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Despedidas
    const despedidas = ["chau", "adiós", "adios", "gracias", "fin"];
    if (despedidas.some((palabra) => text.toLowerCase().includes(palabra))) {
      const botMsg = {
        role: "assistant",
        content: "¡Gracias por chatear con PawBot! 🐾 ¡Hasta luego!",
      };
      setMessages((prev) => [...prev, botMsg]); // se queda en el chat
      return;
    }

    // Respuestas predeterminadas
    if (respuestas[text]) {
      const botMsg = { role: "assistant", content: respuestas[text] };
      setMessages((prev) => [...prev, botMsg]);
      return;
    }

    // IA Groq
    try {
      const res = await API.post("/chat/chat-query", { message: text });
      const botMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error en chatbot:", error);
      const botMsg = {
        role: "assistant",
        content: "Lo siento, hubo un error al procesar tu mensaje 😿",
      };
      setMessages((prev) => [...prev, botMsg]);
    }
  };

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 hover:bg-teal-600 text-white p-4 rounded-full shadow-lg transition-all"
        >
          <Dog className="w-9 h-9" />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-teal-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h2 className="text-lg font-semibold">PawBot 🐾</h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessages([
                  { role: "assistant", content: "¡Hola! 👋 Soy PawBot, el asistente de Pawtitas Petshop. ¿En qué puedo ayudarte hoy?" },
                ]);
              }}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user" ? "bg-teal-100 self-end" : "bg-gray-100 self-start"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {/* Globitos iniciales */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {quickReplies.map((text, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(text)}
                    className="bg-teal-100 text-sm px-3 py-1 rounded-full hover:bg-teal-600 hover:text-white transition-all"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Escribí tu mensaje..."
              className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            <button
              onClick={handleSend}
              className="bg-teal-600 hover:bg-teal-600 text-white p-2 rounded-full"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
