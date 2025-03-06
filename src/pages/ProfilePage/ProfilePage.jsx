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

  const [errors, setErrors] = useState({}) // Estado para manejar errores
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
  // Actualizar perfil en Backend
  // ================================

  const updateProfile = async (endpoint, data) => {
    setLoading(true)
    setSuccessMessage('')
    try {
      await api.put(`/auth/profile/${endpoint}`, data)
      setUser((prevUser) => ({ ...prevUser, ...data }))
      setSuccessMessage('Perfil actualizado con éxito.')
    } catch (error) {
      console.error('Error en la actualización de los datos', error)
      setErrors({ api: error.response?.data?.message || 'Error desconocido' })
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Manejo de actualización
  // ================================

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.username !== user.username)
      updateProfile('usename', { username: formData.username })
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
  // Subir imagen de perfil
  // ================================

  const handleImageChange = async (e) => {
    const file = e.target.file[0]
    if (!file) return

    const formData = new formData()
    formData.append('profileImage', file)

    setLoading(true)
    try {
      const response = await api.put('/auth/profile/avatar', formData, {
        header: { 'cont-type': 'multipart/form/data' },
      })
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.profileImage,
      }))
      setPreviewImage(response.data.profileImage)
      setSuccessMessage('Imagen actualizada con éxito.')
    } catch (error) {
      console.error(' Error al subir imagen:', error)
      setErrors({ api: 'Error al actualizar la imagen.' })
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Selección del Avatar
  // ================================

  const handleAvatarSelect = async (avatarUrl) => {
    updateProfile(
      'Avatar',
      { profileImage: avatarUrl },
      setPreviewImage(avatarUrl),
      setShowAvatarSelector(false)
    )
  }

  // ================================
  // Renderizado del Componente
  // ================================
  return (
    <div className="flex flex-col items-center min-h-screen pt-[68px] px-4 bg-primary-light">
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
          type="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}

        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

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
            {errors.passwords && (
              <p className="text-red-500 text-sm">{errors.passwords}</p>
            )}
          </>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            Guardar Cambios
          </Button>
        </div>
      </form>

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
