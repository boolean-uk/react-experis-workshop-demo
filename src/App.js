import { useState, useEffect } from "react"; // state hook
import "./App.css";
import Task from "./components/Task";

function App() {
  useEffect(() => {
    fetch("http://localhost:3030/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ text: "", completed: false, amount: 1 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get value from first element within element that caused submission event
    const res = await fetch("http://localhost:3030/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    console.log(tasks);
  };

  const updateTasks = async (taskId, value) => {
    const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ completed: value }),
    });

    const updatedTask = await res.json();

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const updateNumber = async (taskId, amount) => {
    if (amount > 1) {
    const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ amount: amount - 1 }),
    });

    const updatedNumber = await res.json()

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return updatedNumber
      }
      return task;
    });
    setTasks(updatedTasks);
    } 
    
  else if (amount === 1) {
    const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ amount: amount - 1 }),
    });

    const updatedNumber = await res.json()

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return updatedNumber
      }
      return task;
    });
    updateTasks(taskId, true)
    setTasks(updatedTasks);
    } 


  };

  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: "DELETE",
    });
    const filteredTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          onChange={handleChange}
          value={task.text}
        />
        <input type="number" name="amount" onChange={handleChange} />
        <button>add task</button>
      </form>

      {tasks.map((item) => {
        return (
          <Task
            task={item}
            key={item.id}
            updateTasks={updateTasks}
            deleteTask={deleteTask}
            updateNumber={updateNumber}
          />
        );
      })}
    </div>
  );
}

export default App;
