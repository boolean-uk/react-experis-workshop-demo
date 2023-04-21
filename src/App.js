import { useState, useEffect } from 'react' // state hook
import './App.css';
import Task from './components/Task'

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({ text: '', completed: false })

  // I want to make a GET /tasks and then show this data on the page
  useEffect(() => {
    fetch("http://localhost:3030/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setTask({...task, [name]: value})
  }

  // create a task when I submit the form
  const handleSubmit = async (event) => {
    event.preventDefault()
    // make a POST HTTP request to http://localhost:3030/tasks/
    // add data to the request body in the format JSON
    const res = await fetch("http://localhost:3030/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

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

    // 1 then make a GET request
    // fetch("http://localhost:3030/tasks")
    //   .then(res => res.json())
    //   .then(data => setTasks(data))
    // 2 or make the update locally
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return updatedTask
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: 'DELETE'
    })

    // 1 then make a GET request
    // fetch("http://localhost:3030/tasks")
    //   .then(res => res.json())
    //   .then(data => setTasks(data))
    // 2 or make the update locally
    const filteredTasks = tasks.filter(item => item.id !== taskId)
    setTasks(filteredTasks)
  }

  return (

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
