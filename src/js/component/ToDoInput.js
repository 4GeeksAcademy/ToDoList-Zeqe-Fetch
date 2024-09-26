import React, { useState } from "react";

function ToDoInput({ addTask }) {
  const [newTask, setNewTask] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask(newTask);
      setNewTask(""); 
    }
  };

  return (
    <input
      type="text"
      placeholder="Añadir nueva tarea"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
}

export default ToDoInput;
