import { useState, useEffect, Suspense } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner"
import { requestChangePassword } from "../features/auth/authSlice";

const RequestResetPassword = () => {
  const [email, setEmail] = useState('')
  const { user, isSuccess, isError, successMessage, errorMessage } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data= {
      email
    }
    dispatch(requestChangePassword(data))
  }

  useEffect(() => {
    if (user.verified !== false) {
      navigate('/')
    }

    if (isSuccess) {
      const message = successMessage.successMessage
      toast.success(message)
    }

    if (isError) {
      const messages = errorMessage.split(',')

      messages.map(message => toast.error(message))
    }
  }, [user, navigate, isSuccess, successMessage, isError, errorMessage])

  return (
    <Suspense fallback={<Spinner />}>
      <div className="grid place-items-center h-[50vh]">
        <div className="w-full md:w-1/2">
          <form className="shadow-md rounded px-8 pt-6 pb-8 bg-gray-100" onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="email" name="email" placeholder='Enter your email address' id="email" required onChange={onChange} value={email} />
            </div>
            <div className='flex flex-row items-center justify-between'>
              <button className="bg-blue-600 text-white p-2 px-5 font-bold text-lg hover:bg-blue-800" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  )
}

export default RequestResetPassword