import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const TaskBar = ({type}) => {
  return (
    <div className="bg-slate-100 flex gap-7 p-5 mt-[-30px] rounded-b-2xl">
            <Link to={'/create-task'} className="font-bold text-lg hover:scale-125 duration-200"><FontAwesomeIcon icon={faPlus} size='xl' className="text-green-400"/> Task</Link>
            {type === 'done' ?
            <Link to={'/'}  className="font-bold text-lg hover:scale-125 duration-200">Uncompleted tasks</Link>
            : 
            <Link to={'/tasks/done'}  className="font-bold text-lg hover:scale-125 duration-200">Completed tasks</Link>
          }
          </div>
  )
}

export default TaskBar