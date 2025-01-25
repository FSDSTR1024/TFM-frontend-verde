// components/atoms/Input/Input.jsx
import PropTypes from 'prop-types'
import React, { forwardRef, useEffect, useState } from 'react'
import styles from './Input.module.css'
// forwardRef: es mi control remoto para manejar el input
const Input = forwardRef(
  ({ type = 'text', label, name, validation, onChange, ...props }, ref) => {
    // Estados interactivos del input
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [isTouched, setIsTouched] = useState(false) // Indica sí el usuario interactuo con el Input
    const [isFocused, setIsFocused] = useState(false) // Indica si el input esta enfocado en el navegador
    const [hasValue, setHasValue] = useState(false) // Indica si el input tiene texto dentro de el

    // Capa de seguridad para validar si el Input tiene errores
    const validateInput = (currentValue) => {
      if (!validation) return true

      const { isValid, message } = validation(currentValue)
      setError(isValid ? '' : message)
      return isValid
    }

    useEffect(() => {
      if (isTouched) validateInput(value)
    }, [value, isTouched])

    const handleChange = (e) => {
      setValue(e.target.value)
      setHasValue(!!e.target.value)
      if (onChange) onChange(e, validateInput(e.target.value))
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = (e) => {
      setIsFocused(false)
      setIsTouched(true)
      setHasValue(!!e.target.value)
    }

    return (
      <div className={styles.input__wrapper}>
        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          value={value}
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
          className={`${styles.input__field} ${error ? styles.error : ''} ${
            isFocused || hasValue ? styles.focused : ''
          }`} // Clases dinámicas según estado
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=" " // Truco para activar floating labels
          {...props}
        />
        {/* Label flotante */}
        <label
          htmlFor={name}
          className={`${styles.input__label} ${
            isFocused || hasValue ? styles.label__floating : ''
          }`} // Animación
        >
          {label}
        </label>

        {error && (
          <span
            id={`${name}-error`}
            role="alert"
            aria-live="polite"
            className={styles.input__error}
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)

// Validadores y PropTypes (se mantienen igual)

// Validadores específicos
const emailValidator = (value) => ({
  isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: 'Formato de email inválido',
})

const passwordValidator = (value) => ({
  isValid: /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
  message: 'Mínimo 8 caracteres, 1 mayúscula y 1 número',
})

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password']),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validation: PropTypes.func,
  onChange: PropTypes.func,
}

export const EmailInput = (props) => (
  <Input type="email" validation={emailValidator} {...props} />
)

export const PasswordInput = (props) => (
  <Input type="password" validation={passwordValidator} {...props} />
)
