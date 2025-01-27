// src/components/pages/HomePage/HomePage.jsx
import Input from '@components/atoms/Input'
import '@components/pages/HomePage/HomePage.css'

const HomePage = () => {
  return (
    <div className='home-page'>
      <h1>Home page</h1>
      <Input label='Ejemplo' name='ejemplo' type='email' />
    </div>
  )
}

export default HomePage
