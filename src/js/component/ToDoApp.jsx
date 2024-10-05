import React, { useState, useEffect } from 'react';
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const username = "ezebellino"; 

  
  useEffect(() => {
    fetch(`https://playground.4geeks.com/todo/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al cargar las tareas");
        }
        return response.json();
      })
      .then(data => {
        setTasks(data.tasks || []);
      })
      .catch(error => console.error("Error: ", error));
  }, []);

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    syncTasksWithServer(newTasks); 
  };

  const deleteTask = (taskToDelete) => {
    const newTasks = tasks.filter(task => task !== taskToDelete);
    setTasks(newTasks);
    syncTasksWithServer(newTasks); 
  };

  const clearAllTasks = () => {
    setTasks([]);
    syncTasksWithServer([]); 
  };

  const syncTasksWithServer = (newTasks) => {
    fetch(`https://playground.4geeks.com/todo/users/${username}`, {
      method: "PUT",
      body: JSON.stringify(newTasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al sincronizar las tareas");
        }
        return response.json();
      })
      .then(data => {
        console.log("Tareas sincronizadas: ", data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };

  return (
    <div className="todo-container">
      <h1 className="text-center">Todo App</h1>
      <div className="todo-app">
        <ToDoInput addTask={addTask} />
        {tasks.length === 0 ? (
          <p>No hay tareas, añadir tareas</p>
        ) : (
          <ToDoList tasks={tasks} deleteTask={deleteTask} />
        )}
        <p className="text-start">{tasks.length} item(s) left</p>
        <button onClick={clearAllTasks}>Eliminar todas las tareas</button>
      </div>
    </div>
  );
};

export default ToDoApp;
