import axios from 'axios'

export const getProfileService = async () => {
  const response = await axios.get('/api/user')

  return response.data
}
