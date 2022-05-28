import { useDispatch } from 'react-redux' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons'
import { deleteGoal } from '../features/goal/goalSlice'


const GoalItem = ({ text, id }) => {
  const dispatch = useDispatch()

  const onClick = (e) => {
    dispatch(deleteGoal(id))
  }

  return (
    <div className="flex flex-col space-x-0 space-y-3 my-5 border-2 border-black md:flex-row md:justify-between md:space-x-3 md:space-y-0
    ">
      <div className="p-5 w-full">
        { text }
      </div>
      <div className='group w-full py-4 grid place-content-center hover:bg-red-600 hover:cursor-pointer md:w-1/6 md:py-0' onClick={onClick}>
        <FontAwesomeIcon className="w-full text-red-600 group-hover:text-white group-hover:animate-bounce" icon={faTrashArrowUp} />
      </div>
    </div>
  )
}

export default GoalItem