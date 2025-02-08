import { useState } from 'react'
import { PasswordInput } from '../Input'

const PasswordToggle = ({
  label = 'Contraseña',
  name,
  value,
  onChange,
  required,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const uniqueId = `${name}-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className="relative w-full mb-6">
      {/* Campo de entrada de contraseña */}
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

      {/* Mensaje de error */}
      {error && (
        <div className="text-error-color text-sm mt-1 absolute -bottom-5 left-1">
          {error}
        </div>
      )}

      {/* Toggle de visibilidad */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
        <input
          type="checkbox"
          id={`toggle-${uniqueId}`}
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="hidden"
          aria-controls={uniqueId}
          aria-label={
            showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
          }
        />
        <label
          htmlFor={`toggle-${uniqueId}`}
          className="cursor-pointer flex items-center justify-center p-1 rounded-md transition-all bg-[rgba(var(--primary-dark-rgb),0.05)] w-8 h-8 hover:bg-[rgba(var(--primary-dark-rgb),0.1)] focus-within:outline focus-within:outline-hover-state focus-within:outline-offset-2"
          role="switch"
          aria-checked={showPassword}
        >
          <span className="sr-only">
            {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          </span>
          <svg
            className={`w-5 h-5 transition-colors fill-secondary-dark ${showPassword ? 'fill-hover-state' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {showPassword ? (
              <path d="M12 6C7.454 6 3.735 8.94 2 12c1.735 3.06 5.454 6 10 6s8.265-2.94 10-6c-1.735-3.06-5.454-6-10-6zm0 10c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z" />
            ) : (
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z" />
            )}
          </svg>
        </label>
      </div>
    </div>
  )
}

export default PasswordToggle
