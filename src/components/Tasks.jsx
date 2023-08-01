import { useEffect, useState } from "react"
import axios from 'axios'
import TaskBar from "./TaskBar"
import {deleteTaskRequest, updateTaskRequest} from '../api/task.api.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons"
import Swal from 'sweetalert2'
import { useAuth } from "../context/authContext"
import TaskCard from "./TaskCard"


const Tasks = (props) => {
    const [tasks, setTasks] = useState([])
    const { user} = useAuth()
    const [loadingCards, setLoadingCards] = useState([]);
    const completed = props.type === 'done' ? true : false
    useEffect(()=> {
        const fetchAllTasks = async() => {
            const data = await axios.get(`http://localhost:3000/task?id=${user.id}`)
            setLoadingCards(new Array(data.data.length).fill(false));
            const undoneArray = data?.data.filter((e)=> e.done == completed)
            return setTasks(undoneArray)
        }
        return ()=> fetchAllTasks()
    }, [])


    const handleCheckBoxChange = async(event, id, index) => {

        setLoadingCards((prevLoadingCards) => {
            const updatedLoadingCards = [...prevLoadingCards];
            updatedLoadingCards[index] = true;
            return updatedLoadingCards;
        });
        
        const obj = {
            id: id,
            state: event.target.checked,
            uid: user.id
        }
        try {
            await updateTaskRequest(obj)
            setTasks((prevTasks) => {
                let updatedTasks = [...prevTasks];
                updatedTasks[index].done = event.target.checked;
                updatedTasks = updatedTasks.filter((e)=> e.done == completed)
                return updatedTasks;
            });
            setLoadingCards((prevLoadingCards) => {
                const updatedLoadingCards = [...prevLoadingCards];
                updatedLoadingCards[index] = false;
                return updatedLoadingCards;
            });
            if (event.target.checked) {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats!!',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                  })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Could not update task!!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
              })
            setLoadingCards((prevLoadingCards) => {
                const updatedLoadingCards = [...prevLoadingCards];
                updatedLoadingCards[index] = false;
                return updatedLoadingCards;
            });
        }
    }

    const handleErraseTask = async(id, index) => {
        console.log(id, index)
        setLoadingCards((prevLoadingCards) => {
            const updatedLoadingCards = [...prevLoadingCards];
            updatedLoadingCards[index] = true;
            return updatedLoadingCards;
        });
        try {
            await deleteTaskRequest(id)
            setTasks((prevTasks) => {
                const updatedTasks = prevTasks.filter((e)=> e.tid !== id)
                return updatedTasks;
            });
            setLoadingCards((prevLoadingCards) => {
                let updatedLoadingCards = prevLoadingCards.splice(index, 1);
                return updatedLoadingCards;
            });
            Swal.fire({
                icon: 'success',
                title: 'Task deleted!!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
              })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Could not delete task!!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
              })
            setLoadingCards((prevLoadingCards) => {
                const updatedLoadingCards = [...prevLoadingCards];
                updatedLoadingCards[index] = false;
                return updatedLoadingCards;
            });
        }
    }    

  return (
    <div className="flex flex-col">
        {user ? 
        
        <>
        <TaskBar type={props.type}/>
        <div>
            {
                tasks.length === 0 &&
                <div className="text-center p-10 font-bold text-2xl text-polo-blue-900">
                    Add a task to start!
                </div>
            }
                 
                 <div className="flex gap-4 flex-wrap p-2">
                {
                    tasks?.map((e, index)=>
                <div key={e.tid} className="p-5 bg-gradient-to-bl from-polo-blue-400 to-polo-blue-800 h-[200px] w-[350px] rounded-xl shadow-lg"> 
                {loadingCards[index] ? <FontAwesomeIcon className="text-center align-middle w-full h-full " icon={faSpinner} spin/> :
                        <TaskCard e={e} index={index} handleCheckBoxChange={handleCheckBoxChange} handleErraseTask={handleErraseTask} />
                    }
                    </div>
                    )
                }
                </div>
            
        </div> 
        </>
        : 
        <>
        <br />
        <br />
        <div className="font-bold text-2xl text-center">Log in first!</div>
        </>
        }
    </div>
  )
}

export default Tasks