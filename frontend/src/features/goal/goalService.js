import axiosInstance from "../../utils/axiosInstace";

export const getGoalsService = async () => {
  const response = await axiosInstance.get('goals', { withCredentials: true })

  return response.data
}

export const createGoalService = async (goal) => {
  const response = await axiosInstance.post('goals', goal, { withCredentials: true })

  return response.data
}

export const deleteGoalService = async (id) => {
  const response = await axiosInstance.delete(`goals/${id}`, { withCredentials: true })

  return response.data
}