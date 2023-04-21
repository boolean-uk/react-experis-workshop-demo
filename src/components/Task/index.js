import "./Task.css";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const Task = ({
  task,
  handleCheckboxButton,
  handleDeleteButton,
  handleEditButton,
}) => {
  return (
    <section>
      <div
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
      </div>
      <div className="buttons">
        <input
          type="checkbox"
          onChange={() => handleCheckboxButton(task)}
          checked={task.completed}
        />
        <PencilIcon className="icon" onClick={() => handleEditButton(task)} />
        <TrashIcon className="icon" onClick={() => handleDeleteButton(task)} />
      </div>
    </section>
  );
};

export default Task;
