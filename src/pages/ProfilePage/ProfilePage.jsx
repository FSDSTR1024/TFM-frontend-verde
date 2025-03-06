// =========================================
// Página de Edición de Perfil
// =========================================

import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth'
import api from '@/services/api/axios'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AvatarSelector from '@/components/molecules/AvatarSelector/AvatarSelector'

const ProfilePage = () => {
  const { user, setUser } = useAuth()

  // ================================
  // Estado del Formulario
  // ================================
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    profileImage: user?.profileImage || null,
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [changePassword, setChangePassword] = useState(false)
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const [previewImage, setPreviewImage] = useState(user?.profileImage || null)

  // ================================
  // Manejo de Inputs
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ================================
  // Alternar cambio de contraseña
  // ================================
  const toggleChangePassword = () => {
    setChangePassword((prev) => !prev)
  }

  // ================================
  // Validar nueva contraseña antes de enviarla
  // ================================
  const validatePasswords = () => {
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmNewPassword: 'Las contraseñas no coinciden',
      }))
      return false
    }
    return true
  }

  // ================================
  // Restaurar valores originales
  // ================================
  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      profileImage: user?.profileImage || null,
    })
  }

  // ================================
  // Subir imagen de perfil a Cloudinary y actualizar AuthContext
  // ================================
  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formDataImage = new FormData()
    formDataImage.append('profileImage', file)

    setLoading(true)
    try {
      const response = await api.put('/auth/profile/avatar', formDataImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const updatedImage = response.data.profileImage

      // Actualizar la imagen en AuthContext para que se refleje en toda la UI
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: updatedImage,
      }))

      setPreviewImage(updatedImage)
      setSuccessMessage('Imagen actualizada con éxito.')
    } catch (error) {
      console.error('Error al subir imagen:', error)
      setErrors({ api: 'Error al actualizar la imagen.' })
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Actualizar perfil en Backend
  // ================================
  const updateProfile = async (endpoint, data) => {
    if (endpoint === 'password' && !validatePasswords()) return
    setLoading(true)
    setSuccessMessage('')
    try {
      await api.put(`/auth/profile/${endpoint}`, data)

      // Persistir datos en el estado global (AuthContext)
      if (user) setUser((prevUser) => ({ ...prevUser, ...data }))

      setSuccessMessage('Perfil actualizado exitosamente')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-[68px] px-4 bg-primary-light">
      <h2 className="text-3xl font-bold text-primary-dark mb-6">
        Editar Perfil
      </h2>

      {/* Vista previa de la imagen */}
      {previewImage && (
        <img
          src={previewImage}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full border-4 border-secondary-dark object-cover mb-8"
        />
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative">
          <Button
            variant="primary"
            type="button"
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

      <form className="w-full max-w-[500px] space-y-6 bg-hover-state rounded-lg p-6 border border-secondary-dark shadow">
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
            {errors.confirmNewPassword && (
              <p className="text-red-500">{errors.confirmNewPassword}</p>
            )}
          </>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={() => updateProfile('general', formData)}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>

      {showAvatarSelector && (
        <AvatarSelector
          onSaveAvatar={(avatarUrl) =>
            updateProfile('avatar', { profileImage: avatarUrl })
          }
          onClose={() => setShowAvatarSelector(false)}
        />
      )}

      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {errors.api && <p className="text-red-500 mt-4">{errors.api}</p>}
    </div>
  )
}

export default ProfilePage
