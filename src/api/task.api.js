import axios from 'axios'

export const createTaskRequest = async(task) =>{ 
    const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task`, task)
    return data.data
}

export const fetchAllTasks = async() => {
    const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task`)
    return data.data
}

export const updateTaskRequest = async(task) =>{ 
    const url = `${import.meta.env.VITE_BACKEND_URL}/task/${task.id}`
    const data = await axios.put(url, {done: task.state})
    return data.data
}
export const deleteTaskRequest = async(id) =>{ 
    const url = `${import.meta.env.VITE_BACKEND_URL}/task/${id}`
    const data = await axios.delete(url)
    return data.data
}

export const signUpRequest = async(obj) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`
    const data = await axios.post(url, obj)
    return data.data
}

export const loginRequest = async(obj) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`
    const data = await axios.post(url, obj, {withCredentials:true})
    return data.data
}
    

