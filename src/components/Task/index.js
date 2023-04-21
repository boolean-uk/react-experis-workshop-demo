import "./Task.css";

const Task = ({ task, updateTasks, deleteTask, updateNumber }) => {
  const handleChange = (event) => {
    updateTasks(task.id, event.target.checked);
  };

  const handleClick = () => {
    deleteTask(task.id);
  };

  const handleButton = (e) => {
    updateNumber(task.id, task.amount)
  }

  return (
    <div>
      <span
        style={
          task.completed
            ? {
                textDecoration: "line-through",
                color: "grey",
              }
            : {}
        }
      >
        {task.text}
      </span>
      <input type="checkbox" onChange={handleChange} checked={task.completed} />
      <span>Amount of times left to do: {task.amount}</span>
      <button 
      onClick={handleButton}
      >Task done once</button>
      <img
        className="delete-icon"
        src="icons8-trash-can.svg"
        alt="trash can delete icon"
        onClick={handleClick}
      />
    </div>
  );
};

export default Task;
