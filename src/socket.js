//En este componente se implementa la tecnologia de websockets
//Cuando hay un evento en el backend, este envia un mensaje al front
//En este proyecto, cuando se guarda una noticia en la BD, que esta relacionada
//con alguna accion que el usuario tiene en el portfolio
//el backend envia esta noticia al Front

import { io } from "socket.io-client";

const VITE_API_URL =
  import.meta.env.VITE_API_URL ||
  'https://tfm-backend-verde.onrender.com'


console.log("Conectando a:", VITE_API_URL);

export const socket = io(VITE_API_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Conectado al WebSocket con ID:", socket.id);
});

// Escuchar el evento de nueva noticia
socket.on("FinancialNews", (news) => {
  console.log("📢 Nueva noticia recibida:", news);
  // Aquí puedes manejar los datos directamente en un componente React
});

socket.on("connect_error", (error) => {
  console.error("❌ Error de conexión con WebSocket:", error.message);
  console.error("Detalles del error:", error);
});

socket.on("message", (msg) => {
  console.log("Mensaje recibido:", msg);
});

