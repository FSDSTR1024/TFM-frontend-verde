import { useState, useRef, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react' // Importar los íconos para mostrar/ocultar contraseñas
import useAuth from '@/context/AuthContext/useAuth'
import api from '@/services/api/axios'
import { UserRound, Upload, Camera, CheckCircle, XCircle } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AvatarSelector from '@/components/molecules/AvatarSelector/AvatarSelector'

const ProfilePage = () => {
  const { user, setUser, validateStoredSession } = useAuth()
  const fileRef = useRef(null)

  // Estado para manejar el formulario
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    profileImage: user?.profileImage || null,
  })

  // Estado para los errores, loading, mensaje de éxito y visibilidad de contraseñas
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [changePassword, setChangePassword] = useState(false) // Controla si el usuario quiere cambiar su contraseña
  const [showPassword, setShowPassword] = useState(false) // Estado para controlar la visibilidad de las contraseñas
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
    }, 3000) // El mensaje se oculta después de 3 segundos
  }

  // ================================
  // Manejo de Inputs
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ================================
  // Alternar visibilidad de las contraseñas
  // ================================
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev) // Alternar la visibilidad
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
    // Validar si las contraseñas coinciden
    if (
      formData.newPassword && // Verificamos si hay una nueva contraseña
      formData.newPassword !== formData.confirmNewPassword // Comparamos si la nueva contraseña es diferente de la confirmación
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmNewPassword: 'Las contraseñas no coinciden', // Error si no coinciden
      }))
      return false
    }

    // Validar que la nueva contraseña no sea la misma que la actual
    if (formData.currentPassword === formData.newPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: 'La nueva contraseña no puede ser la misma que la actual.', // Error si la nueva es igual a la actual
      }))
      return false
    }

    // Validaciones pasadas, devuelve true
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
    formDataImage.append('file', file) // Se usa 'file' como clave igual que se hace en postman
    formDataImage.append('upload_preset', 'user_profile') // Usa "upload_preset" como clave para configurar el preset de cloudinary

    setLoading(true)
    try {
      // Subir la imagen directamente a Cloudinary
      const response = await api.post(
        'https://api.cloudinary.com/v1_1/dwsnf2wlr/image/upload',
        formDataImage,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: false, // Evitar enviar cookies
          timeout: 30000, // Damos más timepo de guardado para la imagen en equipos y redes muy lentas
        }
      )

      const updatedImage = response.data.secure_url
      if (!updatedImage) {
        throw new Error(
          'No se pudo obtener la URL de la imagen desde Cloudinary.'
        )
      }
      console.log('Imagen de perfil actualizada:', updatedImage)

      // Enviar la URL al backend para actualizar el perfil del usuario
      await api.put('/auth/profile/avatar', { profileImage: updatedImage })

      // Actualizar el estado global y la vista previa
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: updatedImage,
      }))
      setPreviewImage(updatedImage)

      await validateStoredSession()
      showSuccessMessage('Imagen actualizada con éxito.')
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error de Cloudinary:', error.response.data)
      }
      setErrors({ api: error.message || 'Error al actualizar la imagen.' })
      console.error('Error en handleImageChange:', error)
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Actualizar perfil en Backend (Perfil Completo)
  // ================================
  const updateProfile = async (data) => {
    setLoading(true)
    setSuccessMessage('')

    // Validar contraseñas si se intenta cambiar
    if (data.newPassword && !validatePasswords()) {
      setLoading(false)
      return
    }

    try {
      // Actualizar nombre de usuario, correo y contraseña si se proporcionan
      if (data.username) {
        await api.put('/auth/profile/username', { username: data.username })
        console.log('Nombre de usuario actualizado:', data.username)
      }
      if (data.email) {
        await api.put('/auth/profile/email', { email: data.email })
        console.log('Correo electrónico actualizado:', data.email)
      }
      if (data.newPassword) {
        await api.put('/auth/profile/password', {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        })
        console.log('Contraseña actualizada')
      }
      // Si se proporciona un archivo para imagen, se llama a handleImageChange
      if (data.profileImage) {
        // data.profileImage debe ser un objeto File
        await handleImageChange({ target: { files: [data.profileImage] } })
      }

      // Actualizar el estado global del usuario con los nuevos datos
      setUser((prevUser) => ({ ...prevUser, ...data }))
      await validateStoredSession()
      showSuccessMessage('Perfil actualizado correctamente.')
    } catch (error) {
      setErrors({ api: 'Error al actualizar perfil.' })
      console.error('Error en updateProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Sincronizar previewImage con el estado global del usuario
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

        {/* Checkbox para cambiar contraseña */}
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
              type={showPassword ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <Input
              label="Nueva Contraseña"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Input
              label="Confirmar Nueva Contraseña"
              name="confirmNewPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />

            {/* Botón de mostrar/ocultar contraseñas */}
            <Button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
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
