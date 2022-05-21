import axiosInstance from "../../utils/axiosInstace"

export const getProfileService = async () => {
  const response = await axiosInstance.get('user', { withCredentials: true })

  return response.data
}

export const updateProfileService = async (user) => {
  const response = await axiosInstance.put('user', user, { withCredentials: true })

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(
      {
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        verified: response.data.verified
      }
    ))
  }

  return response.data
}
