import React from 'react'

const RegisterPage = () => {
  return (
    <div className="grid place-items-center h-[85vh]">
      <div className="w-full md:w-1/2">
        <form className="shadow-md rounded px-8 pt-6 pb-8 bg-gray-100">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="firstname">First Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="firstname" placeholder='Enter your firstname' id="firstname" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="lastname">Last Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="lastname" placeholder='Enter your lastname' id="lastname" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="text" name="email" placeholder='Enter your email' id="email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="password" name="password" placeholder='Enter your password' id="password" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400" type="password" name="confirmPassword" placeholder='Confirm your password' id="confirmPassword" />
          </div>
          <div className='flex flex-row items-center justify-between'>
            <button className="bg-blue-600 text-white p-2 px-5 font-bold text-lg hover:bg-blue-800" type="submit">Register</button>
            <button className="text-blue-500 p-2 px-5 font-bold text-lg hover:text-blue-800" type="button">Already have an account?</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage