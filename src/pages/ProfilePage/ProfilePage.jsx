import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth'
import api from '@/services/api/axios'
import { UserRound, Upload, Camera, CheckCircle, XCircle } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AvatarSelector from '@/components/molecules/AvatarSelector/AvatarSelector'
import { useState, useRef } from 'react'

const ProfilePage = () => {
  const { user, setUser, validateStoredSession } = useAuth()
  const fileRef = useRef(null)

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
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // ================================
  // Función para mostrar mensaje de exito
  // ================================
  const showSuccessMessage = (message) => {
    setErrors({}) // Limpiamos los errores
    setSuccessMessage(message)
    setShowSuccessModal(true)

    setTimeout(() => {
      setShowSuccessModal(false)
    }, 3000) // Mostramos el mensaje y después de 3 segundos se oculta
  }

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

      // Actualizamos la imagen en AuthContext para que se refleje en toda la UI
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: updatedImage,
      }))

      setPreviewImage(updatedImage)

      await validateStoredSession() // Se sincroniza la sesión con el estado global
      showSuccessMessage('Imagen actualizada con éxito.') // Mostramos el modal de confirmación de actualización exitosa
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
    try {
      await api.put(`/auth/profile/${endpoint}`, data)

      // Persistir datos en el estado global (AuthContext)
      if (user) setUser((prevUser) => ({ ...prevUser, ...data }))

      await validateStoredSession() // Actualiza la sesión almacenada
      showSuccessMessage('Perfil actualizado correctamente.')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-[68px] px-4 bg-primary-light mb-20">
      <h2 className="text-4xl font-semibold text-primary-dark mb-8 tracking-wide animate-fade-in">
        Editar Perfil
      </h2>
      {/* Imagen de perfil con Glassmorphism */}
      <div className="relative">
        <div
          className="w-32 h-32 rounded-full border-4 border-secondary-dark shadow-lg overflow-hidden
                        transition-all duration-300 hover:scale-105"
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <UserRound className="w-full h-full text-secondary-dark p-6" />
          )}
        </div>
      </div>
      {/* Botones de selección de imagen */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button
          variant="primary"
          type="button"
          onClick={() => fileRef.current.click()}
        >
          <Upload className="w-5 h-5 mr-2" />
          Subir Foto
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <Button
          variant="primary"
          type="button"
          onClick={() => setShowAvatarSelector(true)}
        >
          <Camera className="w-5 h-5 mr-2" />
          Elegir Avatar
        </Button>
      </div>
      {/* Formulario con Glassmorphism */}
      <form
        className="w-full max-w-[500px] mt-8 p-6 bg-primary-dark/70 backdrop-blur-xl shadow-2xl rounded-xl border border-secondary-dark
                  space-y-5 animate-slide-up"
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

        {/* Checkbox de cambio de contraseña */}
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            checked={changePassword}
            onChange={toggleChangePassword}
            id="changePassword"
          />
          <label
            htmlFor="changePassword"
            className="text-primary-light text-sm cursor-pointer m-5"
          >
            ¿Cambiar Contraseña?
          </label>
        </div>

        {/* Campos de contraseña */}
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

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="primary" type="button" onClick={handleCancel}>
            <XCircle className="w-5 h-5 mr-2" />
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={() => updateProfile('general', formData)}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
      {/* Mensaje de éxito o error */}
      {successMessage && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-green-100/80
                  text-green-600 border border-green-500 rounded-xl p-4 shadow-lg flex items-center gap-3
                  backdrop-blur-md animate-fade-in"
        >
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span className="text-sm font-medium">{successMessage}</span>
        </div>
      )}
      {showAvatarSelector && (
        <AvatarSelector
          onSaveAvatar={(avatarUrl) =>
            updateProfile('avatar', { profileImage: avatarUrl })
          }
          onClose={() => setShowAvatarSelector(false)}
        />
      )}
    </div>
  )
}

export default ProfilePage
