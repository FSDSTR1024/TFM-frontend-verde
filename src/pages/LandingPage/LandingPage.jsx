//En este componente, se grafica el modelo de cajas en la Landing Page
//Y se insertan todo los componentes
//Esta compuesto por 5 Columnas x 3 Filas 

import Indices from '@Components/organisms/indices/Indices'
import StockIndicesDashboard  from '@Components/organisms/grafico/StockIndicesDashboard'
import NoticiasEconomicas  from '@Components/organisms/noticias/NoticiasEconomicas'
import AnalisisAcciones  from '@Components/organisms/noticias/AnalisisAcciones'
import AccionesMejorRendimiento  from '@Components/organisms/noticias/AccionesMejorRendimiento'
import AccionesPeorRendimiento  from '@Components/organisms/noticias/AccionesPeorRendimiento'
import MarketTrendsComponent  from '@Components/organisms/noticias/MarketTrendsComponent'
import Calendario  from '@Components/organisms/noticias/Calendario'
import Variaciones  from '@Components/organisms/grafico/Variaciones'
import Tendencias_Sectores from '@Components/organisms/grafico/Tendencias_Sectores'
import Performance from '@Components/organisms/grafico/Performance'


const LandingPage = () => {


  return (
    <div className="min-h-screen flex flex-col">

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Primera fila de cajas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="p-4 rounded-lg shadow-lg flex flex-col md:col-span-1 col-span-1 w-full h-[520px] overflow-hidden bg-verde-claro">
            <Indices />
          </div>
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px] bg-verde-clarito ">
            <StockIndicesDashboard />
          </div>
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px] bg-verde-claro">
            <NoticiasEconomicas />
          </div>
        </div>

        {/* Segunda fila de cajas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="w-full bg-purple-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-[260px] bg-verde-claro">
           <Performance />
          </div>
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[260px] bg-verde-claro">
           <AnalisisAcciones />
          </div>
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[260px] bg-verde-claro">
           <Variaciones />
          </div>
        </div>

        {/* Tercera fila de cajas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
           <AccionesMejorRendimiento/>
          </div>
          <div className="p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
           <AccionesPeorRendimiento/>  
          </div>
          <div className="bg-emerald-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
            <MarketTrendsComponent />
          </div>
          <div className="bg-gray-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
            <Calendario />
          </div>
          <div className="bg-blue-800 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
            <Tendencias_Sectores />
          </div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage

