import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './Navbar.css' // Importamos los estilos

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeForm, setActiveForm] = useState('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (activeForm === 'login') {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(true)
    }
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
    setFormData({ email: '', password: '', name: '' })
    setActiveForm('login') // Reseteamos el formulario a login cuando se cancela
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setFormData({ email: '', password: '', name: '' })
    setShowDropdown(false)
    setActiveForm('login') // Reseteamos el formulario a login al cerrar sesión
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-button">
            <Menu size={24} color="white" />
          </button>
          <img
            src="https://via.placeholder.com/100"
            alt="Logo"
            className="logo"
          />
          <span className="brand-name">GFINANCE</span>
        </div>

        <div className="navbar-right">
          {!isLoggedIn ? (
            <button className="auth-button" onClick={() => setShowModal(true)}>
              {'Iniciar Sesión'}{' '}
              {/* Siempre mostramos "Iniciar Sesión" en el botón principal */}
            </button>
          ) : (
            <div className="dropdown" ref={dropdownRef}>
              <img
                src={
                  isLoggedIn
                    ? 'https://via.placeholder.com/150'
                    : '/default-avatar.png'
                }
                alt="Avatar"
                className="avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="dropdown-content">
                  <div className="dropdown-item" onClick={handleLogout}>
                    Cerrar Sesión
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  {activeForm === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                </h2>
                <button className="close-button" onClick={handleCancel}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="auth-form">
                {activeForm === 'register' && (
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-footer">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveForm(
                        activeForm === 'login' ? 'register' : 'login',
                      )
                    }
                    className="switch-form-button"
                  >
                    {activeForm === 'login'
                      ? '¿No tienes cuenta? Regístrate'
                      : '¿Ya tienes cuenta? Inicia sesión'}
                  </button>
                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      {activeForm === 'login'
                        ? 'Iniciar Sesión'
                        : 'Registrarse'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
