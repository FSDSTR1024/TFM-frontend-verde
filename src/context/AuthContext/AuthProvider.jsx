import { useEffect, useState } from 'react'
// aquí importamos el api de Axios
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/validate-token')
        setUser(response.data)
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
      }
    }
    checkAuth()
  }, [])

  const login = userData => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
