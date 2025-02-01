import { useContext } from 'react'
import { AuthContext } from './AuthContext'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth

// Apartir de este momento puedo utilizar:
// const { isLoggedIn, user, login, logout } = useAuth()
