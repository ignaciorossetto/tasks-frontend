import { Form, Formik } from "formik";
import { createTaskRequest } from "../api/task.api";
import {  useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { useAuth } from "../context/authContext";

const NewTaskForm = () => { 
  const [taskLoading, setTaskLoading] = useState(false)
  const { user} = useAuth()


  return (
    <div className="bg-slate-100 min-h-[70vh] flex">
      <div className="flex w-[50%]">

      <Formik 
      initialValues={{
        title: "",
        description: "",
        
      }}
      
      onSubmit={async(values, {resetForm})=>{
        setTaskLoading(true)
        resetForm()
        try {
          const obj = {...values, uid: user.id}
          console.log(obj)
            await createTaskRequest(obj)
            setTaskLoading(false)
            Swal.fire({
              icon: 'success',
              title: 'Task created!!',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
            })
        } catch (error) {
          setTaskLoading(false)
            console.log(error)
        }
      }}
      >
        {({handleChange, handleSubmit})=>
        <Form
         onSubmit={handleSubmit}
         className='flex flex-col justify-center gap-3 w-[100%] bg-slate-100 px-5 py-10'
         
         >
          {taskLoading ? <div className="self-end"><FontAwesomeIcon icon={faSpinner} spin size="2xl"/></div> : 
          <>
          <label className="p-3 font-bold">Title:</label>    
          <input className="p-3 w-[90%] self-center" onChange={handleChange} type="text" placeholder="Write title..." name="title"/>
          <label className="p-3 font-bold">
            Description: 
          </label>
          <textarea className="p-3 w-[90%] self-center" onChange={handleChange} type="text" rows={3} placeholder="Write description..." name='description'/>
          <button className="p-3 hover:scale-110 rounded-xl bg-slate-400 w-[50%] self-center font-bold" type="submit">Save!</button>
          </>
          }
        </Form>        
      }

      </Formik>
      </div>
      <div className="w-[50%] bg-[url('/createImg2.jpg')] bg-cover"/>
    </div>
  );
};

export default NewTaskForm;
