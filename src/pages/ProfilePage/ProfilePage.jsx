import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth'
import api from '@/services/api/axios'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import AvatarSelector from '@/components/molecules/AvatarSelector/AvatarSelector'

// =======================
// Página de Perfil
// =======================
const ProfilePage = () => {
  const { user, setUser } = useAuth()

  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const [previewImage, setPreviewImage] = useState(user?.profileImage || null)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profileImage: user?.profileImage || null,
  })

  // =======================
  // Selección de Avatar Predeterminado
  // =======================
  const handleAvatarSelect = async (avatarUrl) => {
    try {
      const response = await api.put(
        '/user/profile',
        { profileImage: avatarUrl },
        {
          withCredentials: true, //  Se asegura que se envíe la cookie de sesión
        }
      )

      setUser(response.data)
      setFormData((prev) => ({
        ...prev,
        profileImage: avatarUrl,
      }))
      setPreviewImage(avatarUrl)
    } catch (error) {
      console.error('Error al actualizar el avatar', error)
    }
    setShowAvatarSelector(false)
  }

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
  // Enviar el formulario
  // =======================
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos enviados:', formData)

    api
      .put('/user/profile', formData, { withCredentials: true })
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => console.error('Error al actualizar perfil:', error))
  }

  // =======================
  // Renderizado del Componente
  // =======================
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] px-4 py-10 bg-primary-light">
      <h2 className="text-3xl font-bold text-primary-dark mb-6">
        Editar Perfil
      </h2>

      {/* Vista previa del avatar*/}
      {previewImage && (
        <img
          src={previewImage}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full border-4 border-secondary-dark object-cover mb-8"
        />
      )}

      <div>
        <h2>Editar Perfil</h2>
        <button onClick={() => setShowAvatarSelector(true)}>
          Seleccionar Avatar
        </button>
        {showAvatarSelector && (
          <AvatarSelector
            onSaveAvatar={handleAvatarSelect}
            onClose={() => setShowAvatarSelector(false)}
          />
        )}
      </div>

      {/* formulario */}
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
    </div>
  )
}

export default ProfilePage
