import React from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, deleteTask }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <ToDoItem key={index} task={task} deleteTask={() => deleteTask(index)} />
      ))}
    </ul>
  );
}

export default ToDoList;
