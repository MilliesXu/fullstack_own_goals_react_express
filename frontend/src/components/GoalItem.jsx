import React from 'react'

const GoalItem = ({ text }) => {
  return (
    <div className="my-5 border-2 border-black p-5">
      { text }
    </div>
  )
}

export default GoalItem