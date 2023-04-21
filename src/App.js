import { useEffect, useState } from "react"; // state hook
import "./App.css";
import Task from "./components/Task";

// ? this is absolute
// const initialTasks = [
//  { id: 1, text: 'Go shopping', completed: false },
//  { id: 2, text: 'Work out', completed: false },
//  { id: 3, text: 'See the doctor', completed: true }
// ]
// let id = initialTasks.length
const defaultValue = {
  text: "",
  completed: false,
};

function App() {
  //! debug
  //? it append the id filed on the end of the task cause it doent have one
  //!? the ones that we create and POST from the react act
  //* current state of Form component!

  // const [loaded, setLoaded] = useState(false);
  const [task, setTask] = useState(defaultValue);
  const [tasks, setTasks] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const http = "http://localhost:3030/tasks";

  //*DONE
  const getData = async () => {
    try {
      const response = await fetch(http);
      const results = await response.json();
      //* to Load!
      // setLoaded(response.ok);
      setTasks(results);
    } catch (error) {
      console.error(error);
    }
  };
  //*DONE
  //? Add try-catch block
  const postData = async (data) => {
    try {
      const response = await fetch(http, {
        method: "POST", //* default get
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  //*DONE
  const deleteData = async (id) => {
    try {
      const response = await fetch(http + `/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };
  //*DONE
  const putData = async (data, id) => {
    try {
      const response = await fetch(http + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  //*DONE
  useEffect(() => {
    //* this code block runs once when the component mounts if the depencacies array is []
    getData();
  }, []); //? this is the depencacies array

  //*DONE
  const handleChange = (e) => {
    //* decunstrd task
    const newTask = { ...task };
    //* get new Text value
    newTask.text = e.target.value;
    setTask({ ...newTask });
  };

  //*DONE
  const handleSubmit = (e) => {
    //*prevent refresh of page
    //! default of FORM sumbit => refresh page/refresh input
    //! preventDefault prevent the page from beening refreshed!
    e.preventDefault();
    //* current state of Form=>task.state
    //? Post the data to the db.json through postData(data)
    postData(task);
    //* retreive data from database
    setTasks([...tasks, task]);
  };
  //*DONE
  const handleCheckboxButton = (taskToBeUpdated) => {
    //* deconstructed the task =>id,completed
    const { id, completed } = taskToBeUpdated;
    //* map over the state TASKS list and change complted=>!complted
    const newTasks = tasks.map((task) => {
      if (id === task.id) {
        task.completed = !completed;
      }
      return task;
    });
    //*putData
    putData(taskToBeUpdated, id);
    //* Render the page to show the update
    setTasks(newTasks);
  };
  //*DONE
  const handleDeleteButton = (taskToDelete) => {
    //? e=>event that triggers from the user has a Key name target
    //? when i click anywhere on the browser that click create this event target is what store the "where"
    //* Create new tasks array without the taskToDelete item
    const newTasks = tasks.filter((item) => item.id !== taskToDelete.id);
    //* deleteData by the id ToBe delete
    deleteData(taskToDelete.id);
    //* put the task in filtered tasks list(state)
    setTasks(newTasks);
  };
  //todo the last todo!
  const handleEditButton = (taskToBeUpdated) => {
    setTask(taskToBeUpdated);
    setIsEditOpen(true);
  };
  const handleEditSumbit = (e) => {
    e.preventDefault();
    //* deconstructed the task =>id,completed
    const { id, text } = task;
    //* map over the state TASKS list and change complted=>!complted
    const newTasks = tasks.map((task) => {
      if (id === task.id) {
        task.text = text;
      }
      return task;
    });
    //*putData
    putData(task, task.id);
    setTask(defaultValue);
    setTasks(newTasks);
    setIsEditOpen(false);
  };

  return (
    <div className="App">
      {isEditOpen ? (
        <form onSubmit={handleEditSumbit}>
          <input
            onChange={handleChange}
            type="text"
            name="task"
            value={task.text}
          />
          <button>edit task</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="task"
            value={task.text}
          />
          <button>add task</button>
        </form>
      )}

      {tasks.map((item, index) => {
        return (
          <Task
            task={item}
            key={index}
            handleCheckboxButton={handleCheckboxButton}
            handleDeleteButton={handleDeleteButton}
            handleEditButton={handleEditButton}
          />
        );
      })}
    </div>
  );
}

export default App;
