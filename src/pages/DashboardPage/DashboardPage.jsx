import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

// Componentes del dashboard
import Indices from '@Components/organisms/indices/Indices'
import StockIndicesDashboard from '@Components/organisms/grafico/StockIndicesDashboard'
import NoticiasEconomicas from '@Components/organisms/noticias/NoticiasEconomicas'
import Animacion from '@Components/organisms/animacion/Animacion'
import AnalisisAcciones from '@Components/organisms/noticias/AnalisisAcciones'
import FinancialNews from '@Components/organisms/noticias/FinancialNews'
import InsertNews from '@Components/organisms/noticias/InsertNews'
import AccionesMejorRendimiento from '@Components/organisms/noticias/AccionesMejorRendimiento'
import AccionesPeorRendimiento from '@Components/organisms/noticias/AccionesPeorRendimiento'
import MarketTrendsComponent from '@Components/organisms/noticias/MarketTrendsComponent'
import Calendario from '@Components/organisms/noticias/Calendario'
import Tendencias_Sectores from '@Components/organisms/grafico/Tendencias_Sectores'

const DashboardPage = () => {
  // Mostrar mensaje si viene de registro exitoso
  useEffect(() => {
    const successMessage = localStorage.getItem('registrationSuccess')
    if (successMessage) {
      toast.success(successMessage, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      localStorage.removeItem('registrationSuccess')
      console.log('Mensaje eliminado de localStorage después de mostrarlo.')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8">
        {/* Primera fila */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="p-4 rounded-lg shadow-lg flex flex-col md:col-span-1 col-span-1 w-full h-[520px] overflow-hidden bg-verde-claro">
            <Indices />
          </div>
          <div className="p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px] bg-verde-clarito">
            <StockIndicesDashboard />
          </div>
          <div className="p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px] bg-verde-claro">
            <NoticiasEconomicas />
          </div>
        </div>

        {/* Segunda fila */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-[255px] bg-verde-claro">
            <Animacion />
          </div>
          <div className="p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[250px] bg-verde-claro">
            <AnalisisAcciones />
          </div>
          <div className="p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 bg-verde-claro">
            <FinancialNews />
          </div>
          <div className="relative p-8 rounded-lg shadow-lg col-span-1 bg-verde-claro">
            <InsertNews />
          </div>
        </div>

        {/* Tercera fila */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
            <AccionesMejorRendimiento />
          </div>
          <div className="p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
            <AccionesPeorRendimiento />
          </div>
          <div className="p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
            <MarketTrendsComponent />
          </div>
          <div className="p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
            <Calendario />
          </div>
          <div className="p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-64 md:h-80 lg:h-96 bg-verde-claro">
            <Tendencias_Sectores />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
