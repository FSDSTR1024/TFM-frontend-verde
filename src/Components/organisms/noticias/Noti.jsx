//Este componente grafica las noticias que se muestran cuando se usa Websockets

import React, { useEffect, useState } from "react";
import { socket } from "../../socket"; // Importa el socket desde tu archivo socket.js

const Noti = () => {
  const [news, setNews] = useState([]); // Estado para almacenar las noticias

  useEffect(() => {
    // Escuchar el evento 'FinancialNews' y actualizar el estado
    socket.on("FinancialNews", (newNews) => {
      setNews((prevNews) => [...prevNews, newNews]); // Agrega la nueva noticia al estado
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      socket.off("FinancialNews");
    };
  }, []);

  return (
    <div>
      <h1>Noticias Financ</h1>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <h2>{item.title}</h2>
            <p>Tickers: {item.tickers.join(", ")}</p>
            <p>Importancia: {item.importance}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Leer más
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Noti;