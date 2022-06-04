import { useState, useEffect, Suspense } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

import Spinner from "../components/Spinner"
import { resetPassword } from "../features/auth/authSlice"

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: '',
    passwordConfirmation: ''
  })
  const { password, passwordConfirmation } = form
  const { user, isSuccess, isError, successMessage, errorMessage } = useSelector((state) => state.auth)
  const { id, resetPasswordCode } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      id,
      resetPasswordCode,
      password,
      passwordConfirmation
    }
    dispatch(resetPassword(data))
  }

  useEffect(() => {
    if (user.verified !== false) {
      navigate('/')
    }

    if (isSuccess) {
      const message = successMessage.successMessage
      toast.success(message)
      navigate('/login')
    }

    if (isError === true) {
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
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">New Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="password" name="password" placeholder='Enter your new password' id="password" required onChange={onChange} value={password} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="passwordConfirmation">Confirm New Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="password" name="passwordConfirmation" placeholder='Confirm your new password' id="passwordConfirmation" required onChange={onChange} value={passwordConfirmation} />
            </div>
            <div className='flex flex-row items-center justify-between'>
              <button className="bg-blue-600 text-white p-2 px-5 font-bold text-lg hover:bg-blue-800" type="submit">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  )
}

export default ResetPassword