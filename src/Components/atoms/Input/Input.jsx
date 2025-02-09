import { forwardRef, useEffect, useState } from 'react'

// ==========================================================
// Validadores de Entrada
// ==========================================================
const emailValidator = (value) => ({
  isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: 'Formato de email inválido',
})

const passwordValidator = (value) => ({
  isValid: /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
  message: 'Mínimo 8 caracteres, 1 mayúscula y 1 número',
})

// ==========================================================
// Componente de Input Reutilizable
// ==========================================================
const Input = forwardRef(
  (
    { type = 'text', label, name, validation, onChange, value = '', ...props },
    ref
  ) => {
    const [error, setError] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [hasFirstChar, setHasFirstChar] = useState(false)

    //----------------------------------
    // Validación del Input
    //----------------------------------
    const validateInput = (currentValue) => {
      if (!validation) return true
      const { isValid, message } = validation(currentValue)
      setError(isValid ? '' : message)
      return isValid
    }

    //----------------------------------
    // Efecto para Validar en Tiempo Real
    //----------------------------------
    useEffect(() => {
      if (isTouched) validateInput(value)
    }, [value, isTouched])

    //----------------------------------
    // Manejo de Cambio en el Input
    //----------------------------------
    const handleChange = (e) => {
      const currentValue = e.target.value

      if (currentValue.length === 1) {
        setHasFirstChar(true)
      } else if (currentValue.length === 0) {
        setHasFirstChar(false)
      }

      const isValid = validateInput(currentValue)

      if (onChange) {
        const extendedEvent = { ...e, isValid, validationMessage: error }
        onChange(extendedEvent)
      }
    }

    //----------------------------------
    // Manejo de Foco y Blur
    //----------------------------------
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => {
      setIsFocused(false)
      setIsTouched(true)
    }

    return (
      <div className="relative w-full max-w-[400px] my-2">
        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          value={value}
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
          className={`
            w-full min-w-[250px] px-4 py-2 border-2 rounded-md text-primary-dark
            transition-all duration-200 border-secondary-dark outline-none
            focus:outline-2 focus:outline-primary-dark focus:outline-offset-2
            focus:shadow-[0_2px_8px_rgba(33,52,53,0.1)]
            ${error ? 'border-error-color' : 'bg-primary-light'}
          `}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=" "
          data-error={error}
          data-first-char={hasFirstChar}
          {...props}
        />
        <label
          htmlFor={name}
          className={`
            absolute left-4 top-1/2 -translate-y-1/2 text-secondary-dark transition-all
            ${isFocused || value !== '' ? 'transform -translate-y-[170%] scale-90 bg-primary-light px-1' : ''}
          `}
        >
          {label}
        </label>
        {error && (
          <span
            id={`${name}-error`}
            role="alert"
            aria-live="polite"
            className="text-error-color text-sm text-center mt-1 block"
          >
            {error}
          </span>
        )}
      </div>
    )
  }
)

export const EmailInput = (props) => (
  <Input type="email" validation={emailValidator} {...props} />
)
export const PasswordInput = (props) => (
  <Input type="password" validation={passwordValidator} {...props} />
)

export default Input
