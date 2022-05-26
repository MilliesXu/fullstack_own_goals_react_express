import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";

import { createGoal, resetMessage } from '../features/goal/goalSlice'

const GoalForm = () => {
  const [text, setText] = useState('')
  const { successMessage } = useSelector((state) => state.goals)
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    const goal = { text }
    dispatch(createGoal(goal))
  }
  
  const onChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    if (successMessage.length > 0) {
      toast.success(successMessage)
      setText('')
      dispatch(resetMessage())
    }
  }, [successMessage, dispatch])

  return (
    <div className="grid place-items-center h-[85vh]">
      <div className="w-full md:w-1/2">
        <form className="shadow-md rounded px-8 pt-6 pb-8 bg-gray-100" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="text">Goal</label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" name="text" placeholder='Write your goal' id="text" required value={text} onChange={onChange}/>
          </div>
          <div className='flex flex-row items-center justify-between'>
              <button className="bg-blue-600 text-white p-2 px-5 font-bold text-lg hover:bg-blue-800" type="submit">Save Goal</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default GoalForm