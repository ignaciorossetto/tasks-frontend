import { useState } from "react"
import { signUpRequest } from "../api/task.api";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

const SignupForm = () => {
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })
    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault();
        try {
            await signUpRequest(formValues)
            setFormValues({
                email: '',
                password: ''
            })
            setLoading(false)
        } catch (error) {
            setFormValues({
                email: '',
                password: ''
            })
            setLoading(false)     
        }
    }
    const handleInputChange = (e) => {
        setFormValues((prev)=>{
            const newObj = {...prev}
            newObj[e.target.name] = e.target.value
            return newObj
        })
    }
  return (
    <div className="min-h-[70vh] flex">
        <div className="flex h-[50vh] w-[50%] justify-center items-center">
            {loading ? <FontAwesomeIcon size="2xl" icon={faSpinner} spin/> : 
           
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center">
            <label className="font-bold text-xl">Email</label>
            <input value={formValues.email} className="p-3 pr-10" type="email" name="email" onChange={handleInputChange} required/>
            <label className="font-bold text-xl">Password</label>
            <input value={formValues.password} className="p-3 pr-10" type="password" name="password"  onChange={handleInputChange} required/>
            <button className="font-bold bg-polo-blue-900 p-5 text-white hover:scale-125 duration-150 active:bg-polo-blue-100 active:text-polo-blue-800 active:border-polo-blue-800 active:border-2" type="submit">Sign up!</button>
        </form> 
         }
        </div>
        <div className="w-[50%] bg-[url('/createImg2.jpg')] bg-cover"/>
    </div>
  )
}

export default SignupForm