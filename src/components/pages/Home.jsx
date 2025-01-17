import React from 'react'
import Button from '../atoms/Button' // Asegúrate de que esta ruta sea correcta.

const Home = () => {
  const handleClick = () => {
    alert('Botón clicado')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trend Pulse</h1>
      <Button theme="lightGreen" onClick={handleClick}>
        Ir a Home
      </Button>
    </div>
  )
}

export default Home
