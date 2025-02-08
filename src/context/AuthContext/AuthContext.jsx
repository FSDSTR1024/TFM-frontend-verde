// Para el AuthContext lo primero que hago es crear un contexto sin valores iniciales
import { createContext } from 'react'

export const AuthContext = createContext(null) // aquí definimos el contexto, dandole un valor por defecto "null"
