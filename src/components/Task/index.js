import './Task.css'

const Task = ({task, updateTasks, deleteTask, updateText}) => {

  const handleChange = (event) => {
    updateTasks(task.id, event.target.checked)
  }

  const handleClick = () => {
    // add more stuff
    deleteTask(task.id)
  }
  const handleTextChange = () => {
    updateText(task.id)
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
        onChange={handleChange}
        checked={task.completed}
      />
      <img
        className="delete-icon"
        src="icons8-trash-can.svg"
        alt="trash can delete icon"
        onClick={handleClick}
      />
      <button className='ChangeButton' onClick = {handleTextChange}>Change text</button>

    </div>
  )
}

export default Task
