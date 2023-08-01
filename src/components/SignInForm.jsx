import {  useRef, useState } from "react"
import { loginRequest } from "../api/task.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignInForm = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })
    const mailRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()

    const {error,  loading, dispatch } = useAuth()
    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'})
        try {
            const obj = {
                email: formValues.email || mailRef.current.value,
                password: formValues.password || passRef.current.value,
            }
            const result = await loginRequest(obj)
            dispatch({type: 'LOGIN_SUCCESS', payload: result.payload})
            setFormValues({
                email: '',
                password: ''
            })
            Swal.fire({
                icon: 'success',
                title: 'Logged in!!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
              })
            navigate('/')
        } catch (err) {
            dispatch({type: 'LOGIN_ERROR', payload: err.response.data.message})
            setFormValues({
                email: '',
                password: ''
            })
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
        <div className="w-[50%] bg-[url('/createImg2.jpg')] bg-cover"/>
        <div className="flex h-[50vh] w-[50%] justify-center">
        {loading ? <FontAwesomeIcon size="2xl self-center" icon={faSpinner} spin/> :
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center">
            <label className="font-bold text-xl">Email</label>
            <input ref={mailRef} className="p-3 pr-10" type="email" name="email" onChange={handleInputChange} required/>
            <label className="font-bold text-xl">Password</label>
            <input ref={passRef} className="p-3 pr-10" type="password" name="password"  onChange={handleInputChange} required/>
            <br />
            <button className="font-bold bg-polo-blue-900 p-5 text-white hover:scale-110 duration-150 active:bg-polo-blue-100 active:text-polo-blue-800 active:border-polo-blue-800 active:border-2" type="submit">Log in!</button>
            {error && <div className="p-3 bg-red-400/80 rounded-lg font-bold text-black">{error} </div>}
        </form>
        } 
        </div>
        
    </div>
  )
}

export default SignInForm