import { useEffect, useState } from "react"; // state hook
import "./App.css";
import Task from "./components/Task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({text: '', completed: false})

  // I want to make a Get /tasks and then show this dat on the page

  // 1. effect hook
  useEffect(() => {
    // 2. fetch()
    fetch("http://localhost:3030/tasks")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => setTasks(data));
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target
    setTasks({...task, [name]: value})
  }

  // create a task when I submit the form
  const handleSubmit = async (event) => {
    // prevent default behaviour of event (in this case form submission event causes page to reload)
    event.preventDefault();
    // get value from first element within element that caused submission event
    // create a new task with the correct data
    /*const newTask = {
      text: text,
      completed: false,
    };*/
    // NEED to make a POST .HTTP request to http://localhost:3030/tasks/

    const res = await fetch("http://localhost:3030/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })

    const data = await res.json();
    setTasks([...tasks, data]);

    // and then display data

    // create new state
    // const newTasks = [...tasks, newTask]
    // tell react to update state & rerender
    // setTasks(newTasks)
  };

  const updateTasks = async (taskId, value) => {
// make a PATCH HTTP request to http://localhost:3030/tasks/
// add data to the request body in the format JSON
const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({completed: value})
})
const updatedTask = await res.json()


/* 1 then make a GET request
fetch("http://localhost:3030/tasks/")
  .then(res => res.json())
  .then(data => setTasks(data))
*/
// 2 or make the uodate locally
const updatedTasks = tasks.map((task) => {
  if (task.id === taskId) {
    return updatedTask
  }
  return task
})
setTasks(updatedTasks)
};

const deleteTask = async (taskId) => {
  await fetch (`http://localhost:3030/tasks/${taskId}`, {
    method: 'DELETE'
  })

/* 1 then make a GET request
fetch("http://localhost:3030/tasks")
  .then(res => res.json())
  .then(data => setTasks(data))
*/
// 2 or make the update locally
const filteredTasks = tasks.filter(item => item.id !== taskId)
setTasks(filteredTasks)

}

return(

<div className='App'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          onChange={handleChange}
          value={task.text}
        />
        <button>add task</button>
      </form>

      {
        tasks.map(item => {
          return (
            <Task
              task={item}
              key={item.id}
              updateTasks={updateTasks}
              deleteTask={deleteTask}
            />
          )})
      }

    </div>

  )
}

export default App;
