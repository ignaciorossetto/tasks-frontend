import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const TaskCard = ({e, index, handleCheckBoxChange, handleErraseTask}) => {
  return (
    <div className="flex flex-col gap-2 justify-between h-full">
                        <div className="flex flex-col gap-5 justify-between">
                            <h3 className="text-white font-bold text-2xl">{e.title}</h3>
                            <p className="text-white font-normal">{e.description}</p>
                        </div>
                        <div className="flex justify-between">
                        <p className="text-white font-bold ">Done?  <input type="checkbox" className="accent-orange-400" checked={e.done} onChange={(event)=>handleCheckBoxChange(event, e.tid, index)}/></p>
                        <FontAwesomeIcon className="text-white active:text-red-500 hover:scale-125 duration-200" onClick={()=>handleErraseTask(e.tid, index)} icon={faTrash}/>
                        </div>
                </div>
  )
}

export default TaskCard