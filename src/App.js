import { useState, useEffect } from 'react' // state hook
import './App.css';
import Task from './components/Task'


function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({
    text: '',
    completed: false
  })

  useEffect(() => {
    fetch('http://localhost:4000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
  },[])

  const handleChange = (e) => {
    const {name, value} = e.target
    setTask({...task, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(entry => entry.id !== id))
  }

  const updateTask = async (id, value) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({completed: value})
    })
    const updatedTask = await res.json()
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return updatedTask
      }
      return task
    })
    setTasks(updatedTasks)
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
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          )})
      }

    </div>

  )
}

export default App;
