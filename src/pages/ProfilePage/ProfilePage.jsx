import useAuth from '@/context/AuthContext/useAuth'
import api from '@/services/api/axios'
import { UserRound, Upload, Camera, CheckCircle, XCircle } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AvatarSelector from '@/components/molecules/AvatarSelector/AvatarSelector'
import { useState, useRef, useEffect } from 'react' // 🔹 Se agregó useEffect

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
  // Función para mostrar mensaje de éxito
  // ================================
  const showSuccessMessage = (message) => {
    setErrors({})
    setSuccessMessage(message)
    setShowSuccessModal(true)

    setTimeout(() => {
      setShowSuccessModal(false)
    }, 3000)
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

    console.log('Archivo seleccionado:', file)

    const formDataImage = new FormData()
    formDataImage.append('profileImage', file)

    setLoading(true)
    try {
      const response = await api.put('/auth/profile/avatar', formDataImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const updatedImage = response.data.profileImage
      console.log('Imagen subida con éxito:', updatedImage)

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: updatedImage,
      }))

      setPreviewImage(updatedImage)

      await validateStoredSession()
      showSuccessMessage('Imagen actualizada con éxito.')
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
  const updateProfile = async (data) => {
    // 🔹 Ahora está correctamente definido
    setLoading(true)
    setSuccessMessage('')

    try {
      if (data.username) {
        await api.put('/auth/profile/username', { username: data.username })
      }
      if (data.email) {
        await api.put('/auth/profile/email', { email: data.email })
      }
      if (data.newPassword) {
        await api.put('/auth/profile/password', {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        })
      }
      if (data.profileImage) {
        await handleImageChange({ target: { files: [data.profileImage] } })
      }

      setUser((prevUser) => ({ ...prevUser, ...data }))
      await validateStoredSession()

      showSuccessMessage('Perfil actualizado correctamente.')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Actualizar previewImage al cambiar el usuario
  // ================================
  useEffect(() => {
    setPreviewImage(user?.profileImage || null)
  }, [user?.profileImage])

  return (
    <div className="flex flex-col items-center min-h-screen pt-[68px] px-4 bg-primary-light mb-20">
      <h2 className="text-4xl font-semibold text-primary-dark mb-8 tracking-wide animate-fade-in">
        Editar Perfil
      </h2>

      {/* Imagen de perfil */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-secondary-dark shadow-lg overflow-hidden transition-all duration-300 hover:scale-105">
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

      {/* Formulario */}
      <form className="w-full max-w-[500px] mt-8 p-6 bg-primary-dark/70 backdrop-blur-xl shadow-2xl rounded-xl border border-secondary-dark space-y-5 animate-slide-up">
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

        {/* Botón Guardar Cambios */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="primary" type="button" onClick={handleCancel}>
            <XCircle className="w-5 h-5 mr-2" />
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={() => updateProfile(formData)}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>

      {/* AvatarSelector */}
      {showAvatarSelector && (
        <AvatarSelector
          onSaveAvatar={(avatarUrl) =>
            updateProfile({ profileImage: avatarUrl })
          }
          onClose={() => setShowAvatarSelector(false)}
        />
      )}
    </div>
  )
}

export default ProfilePage
