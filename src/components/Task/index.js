import './Task.css'

const Task = ({task, deleteTask, updateTask}) => {

  const removeItem = (id) => {
    deleteTask(id)
  }

  const completeItem = (id, value) => {
    updateTask(id, value)
  }

  return (
    <div>
      <span
        style={
          task.completed ? {
            textDecoration: "line-through",
            color: "grey"
          } : {}
        }
      >
        {task.text}
      </span>
      <input
        type="checkbox"
        onChange={(e) => completeItem(task.id, e.target.checked)}
        checked={task.completed}
      />
      <img
        className="delete-icon"
        src="icons8-trash-can.svg"
        alt="trash can delete icon"
        onClick={() => removeItem(task.id)}
      />

    </div>
  )
}

export default Task
