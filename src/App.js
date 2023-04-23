import { useState, useEffect, useInsertionEffect } from 'react' // state hook
import './App.css';
import Task from './components/Task'


// const initialTasks = [
//  { id: 1, text: 'Go shopping', completed: false },
//  { id: 2, text: 'Work out', completed: false },
//  { id: 3, text: 'See the doctor', completed: true }
// ]
//let id = initialTasks.length

 function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({text : '', completed: false})

   // this is my new GET function with the local data
   useEffect(() => {
    fetch("http://localhost:3030/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const handleChange = (event) =>{
    //event.preventDefault()
    if(event.target.name === 'text'){
      setTask(event.target.value)
      // console.log(e.target.value);
    }
  }

  // const handleSubmit = (event) => {
  //   // prevent default behaviour of event (in this case form submission event causes page to reload)
  //   event.preventDefault()
  //  // id++
  //   // get value from first element within element that caused submission event
  //   const text = event.target[0].value
  //   // create a new task with the correct data
  //   const newTask = {
  //     //id: id,
  //     text: text,
  //     completed: false
  //   }
  //   // create new state
  //   const newTasks = [...tasks, newTask]
  //   // tell react to update state & rerender
  //   setTasks(newTasks)
  // }
   // create a task when I submit the form
   const handleSubmit = async (event) => {
    event.preventDefault()
    // make a POST HTTP request to http://localhost:3030/tasks/
    // add data to the request body in the format JSON
    const newTask = {
      text : event.target[0].value,
      completed : false

    }
    
    const res = await fetch("http://localhost:3030/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    const data = await res.json()
    setTasks([...tasks, data]) }

  const updateTasks = async (taskId, value) => {
    // find the task
    // create a new array with the updated task
    // this is the new PATCH function by Insomnia, so we 
    //have to adapte every time a task is being completed
    // const updatedTasks = tasks.map(task => {
    //   if (task.id === taskId) {
    //     task.completed = value
    //   }
    //   return task
    // })
    // setTasks(updatedTasks)
//Need to make a PATCH requesto to http://localhost:3030/tasks/
const newVar = {completed: value}
const res = await fetch ("http://localhost:3030/tasks/"+[taskId], {
  method : 'PATCH',
  headers : {
    'Content-Type' : 'application/json'
  },
  body : JSON.stringify.apply(newVar)
  })
  const updatedTask = await res.json();
  // we could make a GET request or make the change locally
  //this is how locally would look like:
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return updatedTask
    }
    return task 
  });
  setTasks(updatedTasks)
  }

  const deleteTask = async (taskId) => {

  await fetch (`http://localhost:3030/tasks/${taskId}`, {
  method : 'DELETE',
    })

    const filteredTasks = tasks.filter(item => item.id !== taskId)
    // find the task
    // remove it from the array of tasks
    setTasks(filteredTasks)
  }

  return (

    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="text" 
        onChange={handleChange} 
        value = {task.text}
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
          );
        })
      }

    </div>

  )
  }

  export default App;


