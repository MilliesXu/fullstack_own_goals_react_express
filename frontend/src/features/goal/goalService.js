import axiosInstance from "../../utils/axiosInstace";

export const getGoalsService = async () => {
  const response = await axiosInstance.get('goals', { withCredentials: true })

  return response.data
}
