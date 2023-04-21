import { useState, useEffect, useInsertionEffect } from "react"; // state hook
import "./App.css";
import Task from "./components/Task";
import userEvent from "@testing-library/user-event";

const initialTasks = [
  { id: 1, text: "Go shopping", completed: false },
  { id: 2, text: "Work out", completed: false },
  { id: 3, text: "See the doctor", completed: true },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [text,setText] = useState('')
  
  useEffect(() => {
    fetch("http://localhost:3030/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);
  const handleChange = (e) =>{
    if(e.target.name === 'text'){
      setText(e.target.value)
      // console.log(e.target.value);
    }
  }
  const handleSubmit = async (event) => {
    // prevent default behaviour of event (in this case form submission event causes page to reload)
    // event.preventDefault();

    // get value from first element within element that caused submission event
    const text = event.target[0].value;
    const newTask = {
      text: text,
      completed: false,
    };
    const res = await fetch("http://localhost:3030/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    // create a new task with the correct data

    // create new state
    // const newTasks = [...tasks, newTask] old one
    // // tell react to update state & rerender
    // setTasks(newTasks)
    // const data = await res.json();
    // setTasks([...tasks, data]);
    //since it is now refreshing, it will grab the data on refresh
  };

  const updateTasks = async (taskId, value) => {
    // find the task
    // create a new array with the updated task
    
    const retVal = {completed:value}
    const res = await fetch("http://localhost:3030/tasks/"+[taskId], {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(retVal),
    });
    const updatedTask = await res.json();
    // console.log(updatedTask);
    //1 update locally
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return updatedTask
      }
      return task;
    });
    setTasks(updatedTasks);
    //2 get the data from useEffect
  //   useEffect(() => {
  //     fetch("http://localhost:3030/tasks")
  //       .then((res) => res.json())
  //       .then((data) => setTasks(data));
  //   }, []);
  // };
  }
  const deleteTask = async (taskId) => {
    const res = await fetch(
      "http://localhost:3030/tasks/"+[taskId],
      {
        method: "DELETE",
      }
    )
    // const filteredTasks = tasks.filter((item) => item.id !== taskId);
    // // find the task
    // // remove it from the array of tasks
    // setTasks(filteredTasks);
   const result = await fetch(
    "http://localhost:3030/tasks/",
    {
      method: "GET",
    }
   )
   const data = await result.json()

   console.log(data);
   setTasks(data)
  };
  //line 110 we make react control the text value
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" 
        name="text"
        onChange={handleChange} 
        value = {text}/>
        <button>add task</button>
      </form>

      {tasks.map((item) => {
        return (
          <Task
            task={item}
            key={item.id}
            updateTasks={updateTasks}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
}

export default App;
