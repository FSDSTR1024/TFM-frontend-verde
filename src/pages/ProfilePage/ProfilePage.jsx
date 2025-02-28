import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AvatarSelector from '@/components/molecules/AvatarSelector/AvatarSelector'

// =======================
// Página de Perfil
// =======================
const ProfilePage = () => {
  const { user, setUser } = useAuth()

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    profileImage: user?.profileImage || null,
  })

  const [changePassword, setChangePassword] = useState(false)
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const [previewImage, setPreviewImage] = useState(user?.profileImage || null)

  // =======================
  // Función para cambios en inputs
  // =======================
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // =======================
  // Subir imagen personalizada
  // =======================
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  // =======================
  // Selección de Avatar Predeterminado
  // =======================
  const handleAvatarSelect = (avatarUrl) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: avatarUrl,
    }))
    setPreviewImage(avatarUrl)
    setShowAvatarSelector(false)
  }

  // =======================
  // Activar cambio de contraseña
  // =======================
  const toggleChangePassword = () => {
    setChangePassword(!changePassword)
    if (!changePassword) {
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }))
    }
  }

  // =======================
  // Enviar el formulario
  // =======================
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos enviados:', formData)

    // ACTUALIZAR CONTEXTO GLOBAL
    setUser((prevUser) => ({
      ...prevUser,
      username: formData.username,
      email: formData.email,
      profileImage:
        typeof formData.profileImage === 'string'
          ? formData.profileImage
          : prevUser.profileImage,
    }))
  }

  // =======================
  // Renderizado del Componente
  // =======================
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] px-4 py-10 bg-primary-light">
      <h2 className="text-3xl font-bold text-primary-dark mb-6">
        Editar Perfil
      </h2>

      {/* Vista previa del avatar */}
      {previewImage && (
        <img
          src={previewImage}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full border-4 border-secondary-dark object-cover mb-8"
        />
      )}

      {/* Botones para Imagen y Avatar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Subir Foto Personalizada (Corregido) */}
        <div className="relative">
          <Button
            variant="primary"
            type="button"
            ariaLabel="Subir foto personalizada"
            onClick={() => document.getElementById('uploadImageInput').click()}
          >
            Subir Foto Personalizada
          </Button>
          <input
            id="uploadImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <Button
          variant="primary"
          type="button"
          onClick={() => setShowAvatarSelector(true)}
        >
          Seleccionar Avatar Predeterminado
        </Button>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] space-y-6 bg-hover-state rounded-lg p-6 border border-secondary-dark shadow"
      >
        <Input
          label="Nombre de Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Cambio de contraseña */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={changePassword}
            onChange={toggleChangePassword}
            id="changePassword"
          />
          <label htmlFor="changePassword" className="text-primary-dark">
            ¿Cambiar Contraseña?
          </label>
        </div>

        {changePassword && (
          <>
            <Input
              label="Contraseña Actual"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
            />

            <Input
              label="Nueva Contraseña"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <Input
              label="Confirmar Nueva Contraseña"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button">
            Cancelar
          </Button>

          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </div>
      </form>

      {/* Modal para seleccionar Avatar */}
      {showAvatarSelector && (
        <AvatarSelector
          onSaveAvatar={handleAvatarSelect}
          onClose={() => setShowAvatarSelector(false)}
        />
      )}
    </div>
  )
}

export default ProfilePage
