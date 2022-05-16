import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import Spinner from '../components/Spinner'
import { getProfile } from '../features/profile/profileSlice'

const ProfilePage = () => {
  const { profile, isLoading, isError, errorMessage } = useSelector((state) => state.profile)
  const { user } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if (isError) {
      const messages = errorMessage.split(',')

      messages.map(message => toast.error(message))
    }

    if (user === null) {
      navigate('/login')
    } else {
      dispatch(getProfile())
    }

    
  }, [dispatch, isError, errorMessage, navigate, user])

  return (
    <div className="grid place-items-center h-[85vh]">
      { isLoading ? <Spinner /> : (
        <div className="w-full md:w-1/2">
          <form className="shadow-md rounded px-8 pt-6 pb-8 bg-gray-100">
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="firstname">First Name</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="firstname" placeholder='Enter your firstname' id="firstname" required value={profile?.firstname} onChange={onChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="lastname">Last Name</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="lastname" placeholder='Enter your lastname' id="lastname" required value={profile?.lastname} onChange={onChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="email" placeholder='Enter your email' id="email" required value={profile?.email} onChange={onChange} />
            </div>
            <div className='flex flex-row items-center justify-between'>
              <button className="bg-blue-600 text-white p-2 px-5 font-bold text-lg hover:bg-blue-800" type="submit">Save Changes</button>
              <button className="text-blue-500 p-2 px-5 font-bold text-lg hover:text-blue-800" type="button">Back</button>
            </div>
          </form>
        </div>
      ) }
    </div>
  )
}

export default ProfilePage