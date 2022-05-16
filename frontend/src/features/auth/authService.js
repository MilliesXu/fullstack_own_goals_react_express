import axios from 'axios'

export const loginService = async (userData) => {
  const response = await axios.post('api/session/', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

export const registerService = async (userData) => {
  const response = await axios.post('api/user/', userData)

  return response.data
}

export const verifyService = async (user) => {
  const response = await axios.get(`api/user/${user.id}/${user.verificationCode}`)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

export const logoutService = async () => {
  const response = await axios.delete('api/session/', { withCredentials: true })

  if (response.data) {
    localStorage.removeItem('user')
  }

  return response.data
}
