import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"


const Header = () => {
  const { user, loading, dispatch } = useAuth()
  const navigate = useNavigate()
  const handleLogOutClick = () => {
    dispatch({type: 'LOGOUT_SUCCESS'})
    Swal.fire({
      icon: 'success',
      title: 'See you soon!!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
    })
  navigate('/sign-in')
  }

  return (
    <div className="flex justify-between items-center h-[15vh] bg-gradient-to-b from-polo-blue-400 to-polo-blue-100 rounded-2xl">
        {
          loading ? <FontAwesomeIcon  icon={faSpinner} spin/> :    
          <>
              <Link to={'/'} className="font-semibold italic text-4xl p-5">Task Manager</Link>
              <div className="flex gap-5 justify-between p-5">
              {user ? 
                <>
                  <FontAwesomeIcon className="h-5 hover:scale-125 cursor-pointer duration-150" onClick={handleLogOutClick} icon={faUser}/>
                  <FontAwesomeIcon className="h-5 hover:scale-125 cursor-pointer duration-150" onClick={handleLogOutClick} icon={faArrowRightFromBracket}/>
                </> : 
                <>
              <Link to={'/sign-up'} className="font-bold hover:scale-110 focus:text-white">Register</Link>
              <Link to={'/sign-in'} className="font-bold hover:scale-110 focus:text-white">Login</Link>
              </>
              }
              </div>
            </>
        }
    </div>
  )
}

export default Header