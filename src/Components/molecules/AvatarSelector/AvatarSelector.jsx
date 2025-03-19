import { useState } from 'react'
import { X } from 'lucide-react'
import Logo from '@/Components/atoms/Logo'
import Button from '@/Components/atoms/Button'

// =====================================
// Avatares predeterminados
// =====================================
const defaultAvatars = Array.from(
  { length: 12 },
  (_, index) => `/avatars/avatar${index + 1}.png`
)

// =====================================
// Componente Modal para Seleccionar Avatar
// =====================================
const AvatarSelector = ({ onClose, onSaveAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null)

  // ==========================================
  // Función para seleccionar el avatar
  // ==========================================
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar)
  }

  // ==========================================
  // Guardar selección y cerrar modal
  // ==========================================
  const handleSave = () => {
    if (selectedAvatar) {
      onSaveAvatar(selectedAvatar) // Manda el avatar al ProfileForm
      onClose() // CIERRA EL MODAL
    }
  }

  return (
    <div
      className="fixed inset-0 bg-primary-dark/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-primary-light border-2 border-primary-dark rounded-lg p-6 w-full max-w-md shadow-lg flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-2 right-2 text-primary-dark hover:text-hover-state transition"
        >
          <X size={24} />
        </button>

        {/* Cabecera con Logo */}
        <header className="flex justify-center mb-4">
          <Logo />
        </header>

        {/* Título */}
        <h2 className="text-xl font-semibold text-primary-dark text-center mb-6">
          Elige tu Avatar Favorito
        </h2>

        {/* Avatares */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {defaultAvatars.map((avatar, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleAvatarClick(avatar)}
              aria-label={`Seleccionar Avatar ${index + 1}`}
              className={`w-20 h-20 rounded-full border-2 ${
                selectedAvatar === avatar
                  ? 'border-hover-state ring-2 ring-hover-state'
                  : 'border-secondary-dark'
              } transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-hover-state`}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full object-cover rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} ariaLabel="Cancelar">
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            ariaLabel="Guardar Avatar"
            disabled={!selectedAvatar}
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AvatarSelector
