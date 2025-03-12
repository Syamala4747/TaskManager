import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Home.css";

const API_URL = "https://taskmanager-h8p9.onrender.com/tasks"; // Update with your backend URL

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", description: "", status: "pending" });

  // Fetch tasks from backend
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);
  
  useEffect(() => {
    axios.get("https://taskmanager-h8p9.onrender.com/tasks")
        .then((res) => {
            console.log("Fetched Data:", res.data);
            setTasks(res.data);
        })
        .catch((err) => console.error("Error fetching tasks:", err));
}, []);

  // Handle input changes for new task
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add a new task
  const addTask = () => {
    axios.post(API_URL, newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ name: "", description: "", status: "pending" });
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error("Error deleting task:", error));
  };

  // Edit a task
  const editTask = (id, updatedTask) => {
    axios.put(`${API_URL}/${id}`, updatedTask)
      .then(response => {
        setTasks(tasks.map(task => (task._id === id ? response.data : task)));
      })
      .catch(error => console.error("Error updating task:", error));
  };

  return (
    <div className="home-container">
      <h1>Task Manager</h1>
      
      <div className="task-form">
        <input type="text" name="name" placeholder="Task Name" value={newTask.name} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={newTask.description} onChange={handleChange} />
        <select name="status" value={newTask.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task._id} className="task-item">
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
              <button onClick={() => editTask(task._id, { ...task, status: "completed" })}>Mark as Completed</button>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
