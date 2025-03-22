import { useState, useEffect } from 'react'
import axios from 'axios'

export default function InsertNews() {
  const [status, setStatus] = useState('')
  const [userId, setUserId] = useState(null)

  // Obtener userId al cargar el componente
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    console.log('userId en localStorage:', storedUserId)
    
    if (!storedUserId) {
      setStatus('⚠️ No hay userId almacenado en localStorage')
    } else {
      setUserId(storedUserId)
    }
  }, [])

  const insertNews = async (newsData) => {
    try {
      if (!userId) {
        setStatus('❌ Error: No hay userId disponible')
        return
      }

      // Agrega el userId al objeto newsData
      const dataToSend = {
        ...newsData,
        userId: userId // Envía el userId en el cuerpo de la solicitud
      }

      console.log('Enviando datos con userId:', userId)
      console.log('Tipo de userId:', typeof userId)
      console.log('Datos completos a enviar:', dataToSend)

      let BACKEND;

      // Verifica el entorno usando import.meta.env.PROD
      if (import.meta.env.PROD) {
        // Configuración para Render
        BACKEND = 'https://tfm-backend-verde.onrender.com';
      } else {
        // Configuración para localhost - usa HTTP para desarrollo local
        BACKEND = 'http://localhost:3000';
      }

      const response = await axios.post(
        `${BACKEND}/noticias`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          timeout: 15000 // 15 segundos para dar tiempo a Render
        }
      )

      setStatus(`✅ Noticia insertada: ${response.data.titulo}`);
    } catch (error) {
      setStatus(`❌ Error: ${error.message || 'Hubo un problema al insertar la noticia'}`);
      
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Datos de error:', error.response.data);
        console.error('Estado:', error.response.status);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor')
      }
      console.error('Error completo:', error)
    }
  };

  // El resto del componente permanece igual...
  
  return (
    <div className='relative w-full h-full grid grid-cols-2 gap-4'>
      {/* Muestra advertencia si no hay userId */}
      {!userId && (
        <div className="col-span-2 p-2 mb-4 bg-red-100 text-red-700 rounded">
          ⚠️ No se ha detectado userId - Las noticias no se enviarán correctamente
        </div>
      )}
      
      <div className='flex flex-col items-center justify-center'>
        <button 
          className='w-full max-w-[150px] text-xs sm:text-sm btn' 
          style={{ backgroundColor: '#e1e3ac', color: '#223536' }} 
          onClick={() => 
            insertNews({
              titulo: 'Apple y Tesla anuncian alianza en IA',
              descripcion: 'Las compañías unirán fuerzas en el desarrollo de inteligencia artificial.',
              tickers: ['AAPL', 'TSLA'],
              fuente: 'CNBC',
              importancia: 'alta',
              url: 'https://www.cnbc.com/apple-tesla-ai',
            })  
          }
        >
          N 1
        </button>
        <p className='text-xs mt-2'>App-Tes</p>
      </div>

      {/* Resto de los botones... */}
      
      {/* Mostrar el estado actual */}
      <div className="col-span-2 mt-4 p-2">
        {status && <p>{status}</p>}
      </div>
    </div>
  )
}