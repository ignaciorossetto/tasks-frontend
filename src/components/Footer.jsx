import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons'

import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="h-[15vh] bg-polo-blue-500 w-full flex justify-between items-center rounded-b-2xl">
      <div className=" p-5 w-[33%] font-bold text-polo-blue-100 text-center">
        <Link to={'https://www.ignaciorossetto.com.ar'} >Back to portfolio</Link>
      </div>
      <div className="w-[33%] p-5 text-center text-4xl text-polo-blue-50 font-extralight">Task Manager</div>
      <div className="w-[33%] p-5 flex gap-3 justify-center">
        <Link to={'https://www.linkedin.com/in/ignaciorossetto'}>
        <FontAwesomeIcon size="2xl" className="hover:scale-125 duration-150 hover:text-white cursor-pointer active:scale-100" icon={faLinkedin}/>
        </Link>
        <Link to={'https://www.instagram.com/ignaciorossetto/'}>
        <FontAwesomeIcon size="2xl" className="hover:scale-125 duration-150 hover:text-white cursor-pointer active:scale-100" icon={faInstagram}/>
        </Link>
        <Link to={'https://github.com/ignaciorossetto?tab=repositories'}>
        <FontAwesomeIcon size="2xl" className="hover:scale-125 duration-150 hover:text-white cursor-pointer active:scale-100" icon={faGithub}/>
        </Link>
        </div>
    </div>
  )
}

export default Footer