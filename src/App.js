import { useState, useEffect } from 'react' // state hook
import './App.css';
import Task from './components/Task'

// const initialTasks = [
//  { id: 1, text: 'Go shopping', completed: false },
//  { id: 2, text: 'Work out', completed: false },
//  { id: 3, text: 'See the doctor', completed: true }
// ]
// let id = initialTasks.length

function App() {
  //const [tasks, setTasks] = useState(initialTasks)
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({ text: '', completed: false})


  //GET /tasks and show to webpage
  //runs everytime the data changes
  useEffect( () => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])


  const handleChange = (e) => {
    const {name, value} = e.target
    setTask({...task, [name]: value})
  }

  //create a task when form is submitted
  const handleSubmit = async (event) => {
    // prevent default behaviour of event (in this case form submission event causes page to reload)
    event.preventDefault()
    //OLD WAY OF CREATING TASK
    //id++
    //const text = event.target[0].value
    // const newTask = {
    //   id: id,
    //   text: text,
    //   completed: false
    // }
    //const newTasks = [...tasks, newTask]
    //setTasks(newTasks)

    //NEW WAY FOR TASK CREATION
    const res = await fetch("http://localhost:5000/tasks", {
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

    const res = await fetch("http://localhost:5000/tasks/${taskId}", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({completed: value})
    })
    const updatedTask = await res.json()


    // find the task
    // create a new array with the updated task
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.completed = value
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const deleteTask = async (taskId) => {

    const res = await fetch("http://localhost:5000/tasks/${taskId}",{
      method: 'DELETE'
    })

    const filteredTasks = tasks.filter(item => item.id !== taskId)
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
