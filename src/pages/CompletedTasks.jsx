import Tasks from "../components/Tasks"

const CompletedTasks = () => {    
  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
        <Tasks type='done' />
    </div>
  )
}

export default CompletedTasks