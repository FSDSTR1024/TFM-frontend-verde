import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const DashboardPage = () => {
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

      localStorage.removeItem('registrationSuccess') // Eliminamos el mensaje inmediatamente después de leerlo
      console.log('Mensaje eliminado de localStorage después de mostrarlo.')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-light p-6">
      <h1 className="text-3xl font-bold text-primary-dark mb-4">Dashboard</h1>
      <p className="text-lg text-secondary-dark">
        Bienvenido al panel de control. Aquí puedes descubrir nuestro contenido.
      </p>
    </div>
  )
}

export default DashboardPage
