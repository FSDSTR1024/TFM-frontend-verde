// Este componente inserta noticias financieras a la base de datos

import { useState } from "react";
import axios from "axios";

export default function InsertNews() {
  const [status, setStatus] = useState("");
  const userId = localStorage.getItem('userId'); // Obtén el userId desde el localStorage

  const insertNews = async (newsData) => {
    try {
      // Agrega el userId al objeto newsData
      const dataToSend = {
        ...newsData,
        userId: userId, // Envía el userId en el cuerpo de la solicitud
      };

      console.log("Enviando datos:", dataToSend);

      const response = await axios.post(
        "https://tfm-backend-kalx.onrender.com/noticias", // URL sin userId
        dataToSend, // Envía el userId en el cuerpo
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 15000, // 15 segundos para dar tiempo a Render
        }
      );

      setStatus(`✅ Noticia insertada: ${response.data.titulo}`);
    } catch (error) {
      setStatus(`❌ Error: ${error.message || 'Hubo un problema al insertar la noticia'}`);
      
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Datos de error:", error.response.data);
        console.error("Estado:", error.response.status);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor");
      }
      console.error("Error completo:", error);
    }
  };

  return (
    <div className="relative w-full h-full grid grid-cols-2 gap-4">
      <div className="flex flex-col items-center justify-center">
        <button 
          className="w-full max-w-[150px] text-xs sm:text-sm btn" 
          style={{ backgroundColor: '#e1e3ac', color: '#223536' }} 
          onClick={() => 
            insertNews({
              titulo: "Apple y Tesla anuncian alianza en IA",
              descripcion: "Las compañías unirán fuerzas en el desarrollo de inteligencia artificial.",
              tickers: ["AAPL", "TSLA"],
              fuente: "CNBC",
              importancia: "alta",
              url: "https://www.cnbc.com/apple-tesla-ai",
            })  
          }
        >
          N 1
        </button>
        <p className="text-xs mt-2">App-Tes</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button 
          className="w-full max-w-[150px] text-xs sm:text-sm btn" 
          style={{ backgroundColor: '#638a63', color: '#e1e3ac' }} 
          onClick={() => 
            insertNews({
              titulo: "Microsoft adquiere OpenAI",
              descripcion: "Microsoft confirma la compra de OpenAI por 20 mil millones.",
              tickers: ["MSFT", "GOOGL"],
              fuente: "The Verge",
              importancia: "ultimo momento",
              url: "https://www.theverge.com/microsoft-openai",
            })                
          }
        >
          N 2
        </button>
        <p className="text-xs mt-2">Mic-Goo</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button 
          className="w-full max-w-[150px] text-xs sm:text-sm btn" 
          style={{ backgroundColor: '#46695a', color: '#e1e3ac' }} 
          onClick={() => 
            insertNews({
              titulo: "Amazon lanza su primer coche eléctrico",
              descripcion: "El nuevo vehículo competirá con Tesla en el mercado de EVs.",
              tickers: ["AMZN"],
              fuente: "Bloomberg",
              importancia: "media",
              url: "https://www.bloomberg.com/amazon-car",
            })
          }
        >
          N 3
        </button>
        <p className="text-xs mt-2">Tes-Amzn</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button 
          className="w-full max-w-[150px] text-xs sm:text-sm btn" 
          style={{ backgroundColor: '#223536', color: '#e1e3ac' }} 
          onClick={() => 
            insertNews({
              titulo: "Intel amplía la línea Xeon 6 con CPUs de núcleos de alto rendimiento",
              descripcion: "Intel Corporation (NASDAQ:INTC), un actor destacado en la industria de semiconductores con una capitalización de mercado de 104.000 millones de dólares y unos ingresos anuales de 53.100 millones de dólares, ha ampliado su familia de procesadores Xeon 6, introduciendo nuevas CPUs con núcleos de alto rendimiento",
              tickers: ["INTC"],
              fuente: "Investing",
              importancia: "baja",
              url: "https://es.investing.com/news/company-news/intel-amplia-la-linea-xeon-6-con-cpus-de-nucleos-de-alto-rendimiento-93CH-3028337",
            })
          }
        >
          N 4
        </button>
        <p className="text-xs mt-2">Intel</p>
      </div>
    </div>
  );
}