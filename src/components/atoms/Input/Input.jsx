import PropTypes from 'prop-types'
import { forwardRef, useEffect, useState } from 'react'
import styles from './Input.module.css'

const Input = forwardRef(
  (
    {
      type = 'text',
      label,
      name,
      validation,
      onChange,
      value = '', // ✅ Recibimos value desde props
      ...props
    },
    ref
  ) => {
    const [error, setError] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [hasFirstChar, setHasFirstChar] = useState(false)

    const validateInput = currentValue => {
      if (!validation) return true

      const { isValid, message } = validation(currentValue)
      setError(isValid ? '' : message)
      return isValid
    }

    useEffect(() => {
      if (isTouched) validateInput(value)
    }, [value, isTouched])

    const handleChange = e => {
      const currentValue = e.target.value

      // Actualizaciones locales de estado
      if (currentValue.length === 1) {
        setHasFirstChar(true)
      } else if (currentValue.length === 0) {
        setHasFirstChar(false)
      }

      // Validación en tiempo real
      const isValid = validateInput(currentValue)

      // Propagación al componente padre
      if (onChange) {
        // Creamos un nuevo evento con datos extendidos
        const extendedEvent = {
          ...e,
          isValid,
          validationMessage: error
        }
        onChange(extendedEvent)
      }
    }

    const handleFocus = () => setIsFocused(true)
    const handleBlur = e => {
      setIsFocused(false)
      setIsTouched(true)
    }

    return (
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          value={value}
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
          className={`${styles.inputField} ${error ? styles.error : ''}`}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=' '
          data-error={error}
          data-first-char={hasFirstChar}
          {...props}
        />
        <label
          htmlFor={name}
          className={`${styles.inputLabel} ${isFocused || value !== '' ? styles.focused : ''}`}
        >
          {label}
        </label>
        {error && (
          <span id={`${name}-error`} role='alert' aria-live='polite' className={styles.error}>
            {error}
          </span>
        )}
      </div>
    )
  }
)

const emailValidator = value => ({
  isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: 'Formato de email inválido'
})

const passwordValidator = value => ({
  isValid: /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
  message: 'Mínimo 8 caracteres, 1 mayúscula y 1 número'
})

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password']),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validation: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export const EmailInput = props => <Input type='email' validation={emailValidator} {...props} />

export const PasswordInput = props => (
  <Input type='password' validation={passwordValidator} {...props} />
)

export default Input
