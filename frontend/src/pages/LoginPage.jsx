import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData
  const { user, isLoading, isError, errorMessage, isSuccess } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }

    dispatch(login(user))
  }

  useEffect(() => {
    if (isError) {
      const messages = errorMessage.split(',')

      messages.map(message => toast.error(message))
      dispatch(reset())
    }

    if (user !== null) {
      navigate('/')
    }
  }, [user, isSuccess, isError, errorMessage, navigate, dispatch])

  return (
    <div className="grid place-items-center h-[50vh]">
      { isLoading ? <Spinner /> : (
        <div className="w-full md:w-1/2">
          <form className="shadow-md rounded px-8 pt-6 pb-8 bg-gray-100" onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="email" name="email" placeholder='Enter your email address' id="email" onChange={onChange} value={email} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="password" name="password" placeholder='Enter your password' id="password" onChange={onChange} value={password} />
            </div>
            <div className='flex flex-row items-center justify-between'>
              <button className="bg-blue-600 text-white p-2 px-5 font-bold text-lg hover:bg-blue-800" type="submit">Login</button>
              <button className="text-blue-500 p-2 px-5 font-bold text-lg hover:text-blue-800" type="button">Forgot Password?</button>
            </div>
          </form>
        </div>
      ) }
    </div>
  )
}

export default LoginPage