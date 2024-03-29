import { useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

import GoalItem from '../components/GoalItem'
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner'
import { getGoals } from '../features/goal/goalSlice'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { goals, isError, errorMessage, isSuccess, successMessage } = useSelector((state) => state.goals)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.verified === false) {
      navigate('/login')
    }

    if (isError) {
      const messages = errorMessage?.split(',')

      messages?.map(message => toast.error(message))
    }

    if (!isSuccess) {
      if (goals.length === 0) {
        dispatch(getGoals())
      }
    }

  }, [user, navigate, goals, dispatch, isError, errorMessage, isSuccess, successMessage])

  return (
    <Suspense fallback={<Spinner />} >
    <div className="px-8">
        { goals.map(goal => (
            <GoalItem key={goal._id} text={goal.text} id={goal._id} />
          ))
        }

        <GoalForm />
    </div>
  </Suspense>
  )
}

export default Dashboard