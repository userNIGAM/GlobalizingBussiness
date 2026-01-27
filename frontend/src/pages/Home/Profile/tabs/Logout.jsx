import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'

const Logout = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogout = async () => {
    setLoading(true)
    setError(null)
    try {
      await logout()
      // Redirect to login page after successful logout
      navigate('/login', { replace: true })
    } catch (err) {
      setError('Failed to logout. Please try again.')
      console.error('Logout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Logout</h2>
        <p className="text-gray-600">Are you sure you want to logout?</p>
      </div>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`px-6 py-2 bg-red-600 text-white rounded-lg font-medium transition-all ${
          loading
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-red-700 active:scale-95'
        }`}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  )
}

export default Logout