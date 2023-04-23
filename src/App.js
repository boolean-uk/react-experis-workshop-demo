import { useEffect, useState } from 'react' // state hook
import './App.css';
import Task from './components/Task'

const initialTasks = [
 { id: 1, text: 'Go shopping', completed: false },
 { id: 2, text: 'Work out', completed: false },
 { id: 3, text: 'See the doctor', completed: true }
]
let id = initialTasks.length

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({ text: '', completed: false })

  useEffect(() => {
    fetch("http://localhost:3030/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask({ ...task, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch("http://localhost:3030/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
    setTask({ text: '', completed: false })
  }

  const updateTasks = async (taskId, value) => {
    // find the task
    // create a new array with the updated task
    const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: value })
    })

    // Alternatively I could do a get (all) request
    const updatedTask = await res.json()
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return updatedTask
      }
      return task
    })
    setTasks([...updatedTasks])
  }

  const deleteTask = async (taskId) => {

    const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: 'DELETE'
    })

    // Alternatively I could do a get (all) request
    const filteredTasks = tasks.filter(item => item.id !== taskId)
    // find the task
    // remove it from the array of tasks
    setTasks(filteredTasks)
  }

  return (

    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" onChange={handleChange} value={task.text} />
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
          )
        })
      }

    </div>

  )
}

export default App;
