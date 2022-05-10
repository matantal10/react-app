import React from "react";
import {useState, useEffect} from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks ] = useState([]);

  //hook
  useEffect(() => {
    const getTasks = async () => {
      const getTasksFromServer = await fetchTasks()
      setTasks(getTasksFromServer)
    }

    getTasks()
  }, []);


  const fetchTasks  = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    console.log(data);

    return data;
  }


  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    console.log(data);

    return data;
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch(
        `http://localhost:5000/tasks`,
        {method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(task)
        })
    const data = await res.json()

    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
  }

  //Delete Task
  async function deleteTask(id) {
    //delete from db.json
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
   setTasks(tasks.filter(task => task.id !== id));
  }

  //toggle reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(
        `http://localhost:5000/tasks/${id}`,
        {method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(updatedTask)
        })

    const data = await res.json()

    setTasks(tasks.map((task) =>
        task.id === id ? {...task, reminder: data.reminder} : task
    )
    )}

  return (
        <div className="container">
         <Header showAddTask={showAddTask} onShowAdd={() => setShowAddTask(!showAddTask)}/>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? (<Tasks tasks={tasks} deleteTask={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks To Show')}
        </div>
  );
}

export default App;
