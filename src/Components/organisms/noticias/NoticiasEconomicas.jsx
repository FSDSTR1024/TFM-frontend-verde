import { useEffect, useState } from "react";
import axios from "axios";

const NoticiasEconomicas = () => {
  const [noticias, setNoticias] = useState([]);
  const [mostrandoNoticiasFallback, setMostrandoNoticiasFallback] = useState(false);
  const [indiceInicio, setIndiceInicio] = useState(0);
  const API_KEY = "77978921e358476788d32eea54607d16";
  const URL = `https://newsapi.org/v2/everything?q=bolsa&language=es&pageSize=10&sortBy=publishedAt&apiKey=${API_KEY}`;

  // Noticias de respaldo para cuando la API falla
  const noticiasFallback = [
    {
      title: "El Ibex 35 cierra con una subida del 1,2% impulsado por el sector bancario",
      description: "Los valores financieros lideraron las ganancias tras los positivos resultados trimestrales presentados por las principales entidades bancarias españolas.",
      url: "#",
      source: { name: "Economía Digital" }
    },
    {
      title: "El euro se fortalece frente al dólar tras las declaraciones del BCE",
      description: "La moneda única europea ha alcanzado máximos de los últimos seis meses después de que el Banco Central Europeo mantuviera los tipos de interés y mostrara optimismo sobre la inflación.",
      url: "#",
      source: { name: "Expansión" }
    },
    {
      title: "Las criptomonedas recuperan terreno: Bitcoin supera los 60.000 dólares",
      description: "El mercado de activos digitales experimenta una fuerte recuperación tras semanas de volatilidad, con Bitcoin liderando las ganancias y alcanzando máximos de los últimos meses.",
      url: "#",
      source: { name: "Cointelegraph" }
    },
    {
      title: "La inflación en España se modera al 2,8% en el último mes",
      description: "El Instituto Nacional de Estadística confirma la moderación de los precios, principalmente por la caída en los costes energéticos y la estabilización de los alimentos.",
      url: "#",
      source: { name: "El Economista" }
    },
    {
      title: "Telefónica anuncia un plan de inversión de 5.000 millones para infraestructura 5G",
      description: "La compañía española intensificará el despliegue de tecnología 5G en los próximos tres años, generando más de 10.000 empleos directos e indirectos.",
      url: "#",
      source: { name: "Cinco Días" }
    },
    {
      title: "La Bolsa de Nueva York registra su mejor semana desde octubre de 2023",
      description: "Wall Street cierra una semana de fuertes ganancias impulsado por los resultados empresariales mejor de lo esperado y las perspectivas de relajación monetaria.",
      url: "#",
      source: { name: "The Wall Street Journal" }
    },
    {
      title: "El precio del petróleo cae un 3% tras el aumento de reservas en Estados Unidos",
      description: "El barril de Brent se sitúa por debajo de los 80 dólares después de que los inventarios estadounidenses aumentaran más de lo previsto, generando preocupaciones sobre la demanda global.",
      url: "#",
      source: { name: "Reuters" }
    },
    {
      title: "Las exportaciones españolas alcanzan récord histórico en el primer trimestre",
      description: "Los datos del Ministerio de Economía muestran un crecimiento del 8,5% en las exportaciones, con particular fortaleza en el sector agroalimentario y la tecnología.",
      url: "#",
      source: { name: "El País" }
    },
    {
      title: "Mercadona amplía su plan de expansión internacional con nuevas tiendas en Portugal",
      description: "La cadena de supermercados española invertirá 200 millones de euros para abrir 30 nuevos establecimientos en el país vecino durante los próximos dos años.",
      url: "#",
      source: { name: "Europa Press" }
    },
    {
      title: "El Banco de España revisa al alza la previsión de crecimiento económico para 2025",
      description: "El organismo mejora sus proyecciones y estima un crecimiento del PIB del 2,6% para el próximo año, impulsado por el consumo interno y la inversión.",
      url: "#",
      source: { name: "La Vanguardia" }
    },
    {
      title: "La CNMV advierte sobre el aumento de estafas relacionadas con inversiones en bolsa",
      description: "El regulador ha detectado un incremento del 35% en las denuncias por fraudes financieros, especialmente en plataformas de trading online no reguladas.",
      url: "#",
      source: { name: "Bolsamanía" }
    },
    {
      title: "Inditex supera expectativas con un beneficio trimestral de 1.500 millones",
      description: "El gigante textil español sorprende al mercado con resultados por encima de lo previsto, impulsado por el buen comportamiento de sus ventas online y la optimización de costes.",
      url: "#",
      source: { name: "Financial Times" }
    },
    {
      title: "El sector inmobiliario español da señales de enfriamiento tras años de subidas",
      description: "Los precios de la vivienda moderan su crecimiento y las transacciones disminuyen un 8% interanual, según los datos del Colegio de Registradores.",
      url: "#",
      source: { name: "Idealista" }
    },
    {
      title: "La inversión extranjera en startups españolas crece un 25% en el último año",
      description: "Los fondos de capital riesgo internacionales han invertido más de 2.000 millones de euros en empresas emergentes españolas, principalmente en sectores como fintech y healthtech.",
      url: "#",
      source: { name: "El Confidencial" }
    },
    {
      title: "El Gobierno aprueba un paquete de medidas para impulsar la reindustrialización",
      description: "El plan incluye incentivos fiscales, ayudas directas y financiación preferente para proyectos industriales estratégicos, con especial enfoque en la sostenibilidad.",
      url: "#",
      source: { name: "EFE" }
    },
    {
      title: "La OPEP mantiene su previsión de demanda de petróleo para 2025",
      description: "La organización de países exportadores no modifica sus proyecciones a pesar de la desaceleración económica en China, esperando una recuperación en la segunda mitad del año.",
      url: "#",
      source: { name: "Bloomberg" }
    },
    {
      title: "La economía circular generará 160.000 empleos en España durante los próximos cinco años",
      description: "Un estudio de la Fundación Ellen MacArthur destaca el potencial de la economía circular para la creación de empleo y la reducción de emisiones en España.",
      url: "#",
      source: { name: "Ecoembes" }
    },
    {
      title: "Las empresas del IBEX 35 aumentan un 15% su inversión en I+D+i",
      description: "Las grandes corporaciones españolas refuerzan su apuesta por la innovación como motor de crecimiento, destinando más de 6.000 millones de euros a investigación y desarrollo.",
      url: "#",
      source: { name: "COTEC" }
    },
    {
      title: "La Comisión Europea mejora las previsiones económicas para España",
      description: "Bruselas eleva en tres décimas su proyección de crecimiento para la economía española, situándola como una de las más dinámicas de la eurozona.",
      url: "#",
      source: { name: "Comisión Europea" }
    },
    {
      title: "El turismo alcanza cifras récord y supera los niveles pre-pandemia",
      description: "España recibió más de 85 millones de turistas internacionales en el último año, con un gasto medio por visitante un 12% superior al de 2019.",
      url: "#",
      source: { name: "Hosteltur" }
    }
  ];

  // Contador para limitar las solicitudes a 10 por hora
  let requestCount = 0;
  const MAX_REQUESTS_PER_HOUR = 10;

  // Función para obtener noticias de la API
  const fetchNoticias = async () => {
    if (requestCount >= MAX_REQUESTS_PER_HOUR) {
      console.log("Límite de solicitudes alcanzado. Usando noticias fallback...");
      setMostrandoNoticiasFallback(true);
      setNoticias(mezclarNoticias(noticiasFallback));
      return;
    }

    try {
      const response = await axios.get(URL);
      if (response.data.articles && response.data.articles.length > 0) {
        setNoticias(response.data.articles);
        setMostrandoNoticiasFallback(false);
      } else {
        console.log("API no retornó noticias. Usando noticias fallback...");
        setMostrandoNoticiasFallback(true);
        setNoticias(mezclarNoticias(noticiasFallback));
      }
      requestCount++; // Incrementa el contador de solicitudes
    } catch (error) {
      console.error("Error al obtener noticias", error);
      console.log("Usando noticias fallback debido a error...");
      setMostrandoNoticiasFallback(true);
      setNoticias(mezclarNoticias(noticiasFallback));
    } finally {
      // Programa la próxima solicitud después de 6 minutos (360,000 ms)
      // Esto asegura que no se superen las 10 solicitudes por hora
      setTimeout(fetchNoticias, 360000);
    }
  };

  // Función para mezclar array de noticias (algoritmo Fisher-Yates)
  const mezclarNoticias = (array) => {
    let noticias = [...array];
    for (let i = noticias.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [noticias[i], noticias[j]] = [noticias[j], noticias[i]];
    }
    return noticias;
  };

  // Rotar noticias cada 2 minutos
  useEffect(() => {
    const rotarNoticias = () => {
      if (mostrandoNoticiasFallback) {
        // Si estamos mostrando noticias fallback, rotamos el índice
        setIndiceInicio((prevIndice) => (prevIndice + 3) % noticiasFallback.length);
      } else if (noticias.length > 3) {
        // Si tenemos más de 3 noticias de la API, también podemos rotarlas
        setIndiceInicio((prevIndice) => (prevIndice + 3) % noticias.length);
      }
    };

    // Iniciar el intervalo de rotación
    const intervalo = setInterval(rotarNoticias, 120000); // 2 minutos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, [mostrandoNoticiasFallback, noticias.length]);

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchNoticias();
  }, []);

  // Obtener las 3 noticias a mostrar actualmente
  const noticiasActuales = noticias.slice(indiceInicio, indiceInicio + 3);

  return (
    <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px] bg-verde-claro w-full">
      <div className="w-full h-full overflow-hidden flex flex-col justify-center">
        <h2 className="text-primary-dark text-2xl font-bold mb-4 text-center w-full">
          Noticias Económicas
        </h2>
        <div className="space-y-4 w-full">
          {noticiasActuales.length > 0 ? (
            noticiasActuales.map((noticia, index) => (
              <a
                key={index}
                href={noticia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition w-full h-[120px] flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-800 w-full line-clamp-2">
                  {noticia.title}
                </h3>
                <p className="text-gray-600 text-sm w-full line-clamp-4 flex-grow">
                  {noticia.description}
                </p>
                <p className="text-gray-500 text-xs w-full">
                  Fuente: {noticia.source?.name || "Desconocida"}
                  {mostrandoNoticiasFallback && <span className="ml-2 italic">(Generada)</span>}
                </p>
              </a>
            ))
          ) : (
            <div className="text-center text-white">Cargando noticias...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticiasEconomicas;