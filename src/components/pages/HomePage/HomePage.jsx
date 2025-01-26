// src/components/pages/HomePage/HomePage.jsx
import Input from '@components/atoms/Input' // Cambia esta ruta a la correcta para tu componente Input
import '@components/pages/HomePage/HomePage.css' // ✔️ Ruta correcta

const HomePage = () => {
  return (
    <div className='home-page'>
      <h1>Home Page</h1>
      <Input label='Ejemplo' name='ejemplo' type='email' />
    </div>
  )
}

export default HomePage
