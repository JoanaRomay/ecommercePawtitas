import API from "./api"; 

export const enviarMensaje = async (mensaje) => {
  try {
    const res = await API.post("/chat/chat-query", { message: mensaje });
    return res.data.reply || "Lo siento, no pude generar una respuesta.";
  } catch (err) {
    console.error("Error en chatService:", err);
    return "Error al comunicarse con el servidor.";
  }
};
