import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import GoalItem from '../components/GoalItem'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.verified === false) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className="px-8">
    <GoalItem text='This is text' />
  </div>
  )
}

export default Dashboard