import React, { useState } from "react";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

function ToDoApp() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
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
        )} <br></br>
        <p className="text-start">{tasks.length}  item left</p>
      </div>
    </div>
  );
}

export default ToDoApp;
