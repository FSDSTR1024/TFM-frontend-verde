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
  // Actualizar perfil en Backend
  // ================================
  const updateProfile = async (endpoint, data) => {
    setLoading(true)
    setSuccessMessage('')
    try {
      await api.put(`/auth/profile/${endpoint}`, data)
      if (user) setUser((prevUser) => ({ ...prevUser, ...data })) // ✅ Solo si el usuario existe
      setSuccessMessage('Perfil actualizado con éxito.')
    } catch (error) {
      console.error('Error en la actualización de los datos', error)
      setErrors({ api: error.response?.data?.message || 'Error desconocido' })
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Subir imagen de perfil
  // ================================
  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('profileImage', file)

    setLoading(true)
    try {
      const response = await api.put('/auth/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.profileImage,
      })) // ✅ Eliminado el `if (setUser)`, ya que `setUser` siempre existe
      setPreviewImage(response.data.profileImage)
      setSuccessMessage('Imagen actualizada con éxito.')
    } catch (error) {
      console.error('Error al subir imagen:', error)
      setErrors({ api: 'Error al actualizar la imagen.' })
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Manejo de Actualización de Datos
  // ================================
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.username !== user.username)
      updateProfile('username', { username: formData.username }) // ✅ Corrección en el endpoint
    if (formData.email !== user.email)
      updateProfile('email', { email: formData.email })
    if (changePassword) {
      updateProfile('password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
    }
  }

  // ================================
  // Selección del Avatar
  // ================================
  const handleAvatarSelect = async (avatarUrl) => {
    await updateProfile('avatar', { profileImage: avatarUrl }) // ✅ Se corrigió 'Avatar' a 'avatar'
    setPreviewImage(avatarUrl)
    setShowAvatarSelector(false)
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-[68px] px-4 bg-primary-light">
      <h2 className="text-3xl font-bold text-primary-dark mb-6">
        Editar Perfil
      </h2>

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

      <form
        onSubmit={handleSubmit} // ✅ Ahora `handleSubmit` está definido
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
          </>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button">
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>

      {showAvatarSelector && (
        <AvatarSelector
          onSaveAvatar={handleAvatarSelect}
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
