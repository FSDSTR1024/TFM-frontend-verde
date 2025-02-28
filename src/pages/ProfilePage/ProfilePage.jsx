// =========================================
// Página de Edición de Perfil
// =========================================

import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth'
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
  const [changePassword, setChangePassword] = useState(false)
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const [previewImage, setPreviewImage] = useState(user?.profileImage || null)

  // ================================
  // Validaciones
  // ================================
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validateUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username)
  const validatePasswords = () =>
    formData.newPassword.length >= 6 &&
    formData.newPassword === formData.confirmNewPassword

  // ================================
  // Manejo de Inputs
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target

    let updatedErrors = { ...errors }

    if (name === 'email' && !validateEmail(value)) {
      updatedErrors.email = 'Formato de email inválido.'
    } else {
      delete updatedErrors.email
    }

    if (name === 'username' && !validateUsername(value)) {
      updatedErrors.username = 'Debe tener entre 3 y 20 caracteres (letras, números o guion bajo).'
    } else {
      delete updatedErrors.username
    }

    if ((name === 'newPassword' || name === 'confirmNewPassword') && changePassword) {
      if (!validatePasswords()) {
        updatedErrors.passwords = 'Las contraseñas no coinciden o son demasiado cortas (mínimo 6 caracteres).'
      } else {
        delete updatedErrors.passwords
      }
    }

    setErrors(updatedErrors)
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ================================
  // Subir Imagen Personalizada
  // ================================
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  // ================================
  // Selección de Avatar Predeterminado
  // ================================
  const handleAvatarSelect = (avatarUrl) => {
    setFormData((prev) => ({ ...prev, profileImage: avatarUrl }))
    setPreviewImage(avatarUrl)
    setShowAvatarSelector(false)
  }

  // ================================
  // Activar Cambio de Contraseña
  // ================================
  const toggleChangePassword = () => {
    setChangePassword(!changePassword)
    if (!changePassword) {
      setFormData((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmNewPassword: '' }))
    }
  }

  // ================================
  // Enviar Formulario
  // ================================
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos enviados:', formData)

    // Si hay errores, no permitir el envío
    if (Object.keys(errors).length > 0) {
      console.error('Errores en el formulario:', errors)
      return
    }

    // Simular actualización en el contexto global
    setUser((prevUser) => ({
      ...prevUser,
      username: formData.username,
      email: formData.email,
      profileImage: typeof formData.profileImage === 'string' ? formData.profileImage : prevUser.profileImage,
    }))
  }

  // ================================
  // Renderizado del Componente
  // ================================
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] px-4 py-10 bg-primary-light">
      <h2 className="text-3xl font-bold text-primary-dark mb-6">Editar Perfil</h2>

      {/* Vista previa del avatar */}
      {previewImage && (
        <img src={previewImage} alt="Foto de perfil" className="w-32 h-32 rounded-full border-4 border-secondary-dark object-cover mb-8" />
      )}

      {/* Botones para Imagen y Avatar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative">
          <Button variant="primary" type="button" ariaLabel="Subir foto personalizada" onClick={() => document.getElementById('uploadImageInput').click()}>
            Subir Foto Personalizada
          </Button>
          <input id="uploadImageInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>

        <Button variant="primary" type="button" onClick={() => setShowAvatarSelector(true)}>
          Seleccionar Avatar Predeterminado
        </Button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full max-w-[500px] space-y-6 bg-hover-state rounded-lg p-6 border border-secondary-dark shadow">
        <Input label="Nombre de Usuario" name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        <Input label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Cambio de contraseña */}
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={changePassword} onChange={toggleChangePassword} id="changePassword" />
          <label htmlFor="changePassword" className="text-primary-dark">¿Cambiar Contraseña?</label>
        </div>

        {changePassword && (
          <>
            <Input label="Contraseña Actual" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} />
            <Input label="Nueva Contraseña" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} />
            <Input label="Confirmar Nueva Contraseña" name="confirmNewPassword" type="password" value={formData.confirmNewPassword} onChange={handleChange} />
            {errors.passwords && <p className="text-red-500 text-sm">{errors.passwords}</p>}
          </>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button">Cancelar</Button>
          <Button variant="primary" type="submit" disabled={Object.keys(errors).length > 0}>Guardar Cambios</Button>
        </div>
      </form>

      {showAvatarSelector && <AvatarSelector onSaveAvatar={handleAvatarSelect} onClose={() => setShowAvatarSelector(false)} />}
    </div>
  )
}

export default ProfilePage