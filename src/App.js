import { useState } from 'react' // state hook
import './App.css';
import Task from './components/Task'

const initialTasks = [
 { id: 1, text: 'Go shopping', completed: false },
 { id: 2, text: 'Work out', completed: false },
 { id: 3, text: 'See the doctor', completed: true }
]
let id = initialTasks.length

function App() {
  const [tasks, setTasks] = useState(initialTasks)

  const handleSubmit = (event) => {
    // prevent default behaviour of event (in this case form submission event causes page to reload)
    event.preventDefault()
    id++
    // get value from first element within element that caused submission event
    const text = event.target[0].value
    // create a new task with the correct data
    const newTask = {
      id: id,
      text: text,
      completed: false
    }
    // create new state
    const newTasks = [...tasks, newTask]
    // tell react to update state & rerender
    setTasks(newTasks)
  }

  const updateTasks = (taskId, value) => {
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

  const deleteTask = (taskId) => {

    const filteredTasks = tasks.filter(item => item.id !== taskId)
    // find the task
    // remove it from the array of tasks
    setTasks(filteredTasks)
  }

  return (

    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type="text" name="task"/>
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
