import { useEffect, useState, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';

import { register, reset } from "../features/auth/authSlice"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const { firstname, lastname, email, password, passwordConfirmation } = formData
  const { user, isSuccess, isError, successMessage, errorMessage } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      firstname,
      lastname,
      email,
      password,
      passwordConfirmation
    }

    dispatch(register(user))
  }

  useEffect(() => {
    if (isError) {
      const messages = errorMessage.split(',')

      messages.map(message => toast.error(message))
      dispatch(reset())
    }

    if (isSuccess) {
      const message = successMessage.successMessage
      toast.success(message)
    }

    if (user.firstname !== '' || user.verified !== false) {
      navigate('/')
    }
  }, [user, navigate, dispatch, isSuccess, isError, errorMessage, successMessage])

  return (
    <Suspense fallback={<Spinner />}>
      <div className="grid place-items-center h-[85vh]">
        <div className="w-full md:w-1/2">
          <form className="shadow-md rounded px-8 pt-6 pb-8 bg-gray-100" onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="firstname">First Name</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="firstname" placeholder='Enter your firstname' id="firstname" value={firstname} onChange={onChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="lastname">Last Name</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="lastname" placeholder='Enter your lastname' id="lastname" value={lastname} onChange={onChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="email" placeholder='Enter your email' id="email" value={email} onChange={onChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="password" name="password" placeholder='Enter your password' id="password" value={password} onChange={onChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="passwordConfirmation">Confirm Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="password" name="passwordConfirmation" placeholder='Confirm your password' id="passwordConfirmation" value={passwordConfirmation} onChange={onChange} required />
            </div>
            <div className='flex flex-row items-center justify-between'>
              <button className="bg-blue-600 text-white p-2 px-5 font-bold text-lg hover:bg-blue-800" type="submit">Register</button>
              <button className="text-blue-500 p-2 px-5 font-bold text-lg hover:text-blue-800" type="button">Already have an account?</button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  )
}

export default RegisterPage