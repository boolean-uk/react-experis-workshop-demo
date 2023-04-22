import { useEffect, useState } from 'react' // state hook
import './App.css';
import Task from './components/Task'




  
function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState({ text: '', completed: false })
// executes once the component renders 
  useEffect(()=>{
    fetch('http://localhost:5000/tasks')
  .then(response => response.json())
  .then(response => setTasks(response))
  .catch(err => console.error(err));
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setText({...text, [name]: value})
  }

  const handleSubmit = async (event) => {

    // prevent default behaviour of event (in this case form submission event causes page to reload)
    event.preventDefault()
    // prevents empty strings
    if(text.text !== ""){
  //   // get value from first element within element that caused submission event
  //   // create a new task with the correct data
 
    const newPost = await fetch("http://localhost:5000/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    })

    const data = await newPost.json()
    setTasks([...tasks, data])
  //  console.log(tasks);
    setText({text: "", completed: false})

  }
}


  const updateTasks = async (taskId, value) => {
    // find the task
    const newUpdate = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({completed : value})
    })
    const updatedTask = await newUpdate.json()
    console.log(updatedTask);
    // create a new array with the updated task
     const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
       return updatedTask
       }
       return task
     })
     setTasks(updatedTasks)
     
  }

  const deleteTask = async (taskId) => {

    const deleteTasks = await fetch(`http://localhost:5000/tasks/${taskId}`, {
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
        <input type="text" name="text" onChange={handleChange} value={text.text}/>
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
