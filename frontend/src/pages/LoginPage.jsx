import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <form>
        <div>
          <input type="email" name="email" placeholder='Enter your email address' />
        </div>
        <div>
          <input type="password" name="password" placeholder='Enter your password' />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage