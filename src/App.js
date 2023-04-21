import { useState, useEffect } from 'react' // state hook & effect hook
import './App.css';
import Task from './components/Task'

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({text: "", completed: false})

  // I want to make a GET /tasks and then show this data on the page
  // 1. effect hook
  useEffect(() => {
     // 2. fetch()
    fetch("http://localhost:3030/tasks")
    .then(res => res.json())
    .then(data => setTasks(data))
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setTask({...task, [name]: value})
  }
 

  const handleSubmit = async (event) => {
    // prevent default behaviour of event (in this case form submission event causes page to reload)
    event.preventDefault()
    // //Need to make a POST HTTP request to http://localhost:3030/tasks/ and then display data
    const res = await fetch("http://localhost:3030/tasks", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  const updateTasks = async (taskID, value) => {
    // make a PATCH HTTP request to http://localhost:3030/tasks/
    // add data to the request body in the format JSON 
    const res = await fetch(`http://localhost:3030/tasks/${taskID}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({completed: value})
    })

    const updatedTask = await res.json()

    const updatedTasks = tasks.map(task => {
      if (task.id === taskID) {
        return updatedTask
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const deleteTask = async (taskID) => {
    await fetch(`http://localhost:3030/tasks/${taskID}`, {
      "method": "DELETE"
    })

    const filteredTasks = tasks.filter(item => item.id !== taskID)
    // find the task
    // remove it from the array of tasks
    setTasks(filteredTasks)
  }

  return (

    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" onChange={handleChange} value={task.text}/>
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
