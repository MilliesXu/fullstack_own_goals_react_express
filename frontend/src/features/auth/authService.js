import axios from 'axios'

export const loginService = async (userData) => {
  const response = await axios.post('http://127.0.0.1:5000/api/session/', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

export const registerService = async (userData) => {
  const response = await axios.post('http://127.0.0.1:5000/api/user/', userData)

  return response.data
}

export const verifyService = async (user) => {
  const response = await axios.get(`http://127.0.0.1:5000/api/user/${user.id}/${user.verificationCode}`)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}
