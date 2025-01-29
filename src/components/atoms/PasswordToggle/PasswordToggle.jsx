import { useState } from 'react'
import { PasswordInput } from '../Input'
import styles from './PasswordToggle.module.css'

const PasswordToggle = ({ label = 'Contraseña', name, value, onChange, required, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  const uniqueId = `${name}-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className={styles.input__group}>
      <PasswordInput
        id={uniqueId}
        label={label}
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        error={error}
        aria-describedby={error ? `${uniqueId}-error` : undefined}
      />

      {error && (
        <div className={styles.error__message} id={`${uniqueId}-error`}>
          {error}
        </div>
      )}

      <div className={styles.toggle__container}>
        <input
          type='checkbox'
          id={`toggle-${uniqueId}`}
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className={styles.toggle__input}
          aria-controls={uniqueId}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        />
        <label
          htmlFor={`toggle-${uniqueId}`}
          className={styles.toggle__label}
          role='switch'
          aria-checked={showPassword}
        >
          <span className={styles.visually_hidden}>
            {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          </span>
        </label>
      </div>
    </div>
  )
}

export default PasswordToggle
