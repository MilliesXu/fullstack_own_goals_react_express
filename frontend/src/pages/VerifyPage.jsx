import { useEffect, Suspense } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

import Spinner from "../components/Spinner"
import { verify } from "../features/auth/authSlice";

const VerifyPage = () => {
  const { user, isError, errorMessage } = useSelector((state) => state.auth)
  const { id, verificationCode } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError === true) {
      const messages = errorMessage.split(',')

      messages.map(message => toast.error(message))
    } else if (user.verified === false) {
      navigate('/')
    } else {
      const user = {
        id,
        verificationCode
      }
      dispatch(verify(user))
    }
  }, [navigate, dispatch, user, isError, id, verificationCode, errorMessage])
  
  return (
    <div className="grid place-items-center h-[50vh]">
      <Suspense fallback={<Spinner />} />
    </div>
  )
}

export default VerifyPage