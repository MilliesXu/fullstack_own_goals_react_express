import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { logout } from '../features/auth/authSlice';
import { resetProfile } from "../features/profile/profileSlice";
import { reload } from '../features/auth/authSlice';

const Header = () => {
  const [active, setActive] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.profile) 
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(resetProfile())
  }

  useEffect(() => {
    if (profile.firstname !== '' && profile.lastname !== '') {
      if (user.firstname !== profile.firstname || user.lastname !== profile.lastname) {
        dispatch(reload({
          firstname: profile.firstname,
          lastname: profile.lastname,
          verified: user.verified
        }))
      }
    }
  }, [user, profile, dispatch])

  return (
    <nav>
      <div className="my-2">
        <div className="flex px-8">
          <ul className="flex-1">
            <li className="font-bold">
              <Link to="/">GOALS</Link>
            </li>
          </ul>
          <ul className="hidden md:flex flex-row flex-start space-x-6">
            { user.verified !== false ? (
              <>
                <li>
                  <div className="font-bold hover:text-gray-600">
                    <Link to="/profile">{`${user.firstname} ${user.lastname}`}</Link>
                  </div>
                </li>
                <li>
                  <div className="font-bold hover:text-gray-600 hover:cursor-pointer" onClick={logoutHandler}>
                    LOGOUT
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div className="font-bold hover:text-gray-600">
                    <Link to="/login">LOGIN</Link>
                  </div>
                </li>
                <li>
                  <div className="font-bold hover:text-gray-600">
                    <Link to="/register">REGISTER</Link>
                  </div>
                </li>
              </>
            ) }
          </ul>

          <button className="block hamburger md:hidden" onClick={() => setActive(!active)}>
            X
          </button>
        </div>

        { active && (
          <div id="menu" className="flex flex-col py-2 font-bold w-full md:hidden">
            <div>
              <Link to="/login">
                <div className="hover:text-gray-100 hover:bg-gray-500 py-2 px-8">
                  LOGIN
                </div>
              </Link>
            </div>
            <div>
              <Link to="/register">
                <div className="hover:text-gray-100 hover:bg-gray-500 py-2 px-8">
                  REGISTER
                </div>
              </Link>
            </div>
            <div>
              <Link to="/user">
                <div className="hover:text-gray-100 hover:bg-gray-500 py-2 px-8">
                  NAME
                </div>
              </Link>
            </div>
            <div>
              <Link to="/logout">
                <div className="hover:text-gray-100 hover:bg-gray-500 py-2 px-8">
                  LOGOUT
                </div>
              </Link>
            </div>
          </div>
        ) }

      </div>
    </nav>
  )
}

export default Header