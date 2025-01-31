import { useState } from 'react'
import { X } from 'lucide-react'
import api from '../../services/api/axios' // Importamos la instancia de Axios pero está dará fallos porque aun no está definida
import useAuth from '@/context/AuthContext/useAuth'
import Button from '../../atoms/Button'
import { EmailInput } from '../../atoms/Input'
import Logo from '../../atoms/Logo'
import PasswordToggle from '../../atoms/PasswordToggle/PasswordToggle'
import styles from './AuthCard.module.css'

const AuthCard = ({
  activeForm,
  fomrDAta = { username: '', email: '', password: ''},
  onInputChange,
  onSubmit,
  onSwitchForm,
  onCancel
}) => {
  const { login } = useAuth() //Con esta linea estoy accediendo al contexto global de autenticación
  const [error, setError]= useState(null) // este const maneja los errores, y este inicia en 'null' (sin error)
}
//----------------------------------
//----------------------------------
// Captura de cambios en los inputs
//----------------------------------
//----------------------------------

const handleInputChange = e => {
  const { name, value } = e.target 
  const newDAta = { ...formData, [name]: value }

  onInputChage
}


