import { useState, useEffect } from 'react' // state hook
import './App.css';
import Task from './components/Task'

// const initialTasks = [
//   { id: 1, text: 'Go shopping', completed: false },
//   { id: 2, text: 'Work out', completed: false },
//   { id: 3, text: 'See the doctor', completed: true }
//  ]
//  let id = initialTasks.length

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({ text: '', completed: false })

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
    // id++
    // // get value from first element within element that caused submission event
    // const text = event.target[0].value
    // // create a new task with the correct data
    // const newTask = {
    //   id: id,
    //   text: text,
    //   completed: false
    // }
    //   const newTasks = [...tasks, newTask]
    //   // tell react to update state & rerender
    //   setTasks(newTasks)
    // }

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
    const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({completed: value})
    })
    const updatedTask = await res.json()

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
    const filteredTasks = tasks.filter(item => item.id !== taskId)
    setTasks(filteredTasks)
  }
  const updateText = async (taskId) => {
    // if Change text button pressed
    // Get the text from the form text box
    const textTochange = document.querySelector('.formText')
    const value = textTochange.value
    // find the task with the specific id and change the text 
    const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: value})
    })
    const updatedTask = await res.json()

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return updatedTask
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (

    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input className='formText'
          type="text"
          name="text"
          onChange={handleChange}
          value={task.text}
        />
        <button className='AddButton'>add task</button>
      </form>

      {
        tasks.map(item => {
          return (
            <Task
              task={item}
              key={item.id}
              updateTasks={updateTasks}
              deleteTask={deleteTask}
              updateText={updateText}
            />
          )})
      }

    </div>

  )
}

export default App;
