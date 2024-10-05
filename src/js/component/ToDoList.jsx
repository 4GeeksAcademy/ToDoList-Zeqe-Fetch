import React from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, deleteTask }) {
  return (
    <ul>
      {Array.isArray(tasks) ? (
        tasks.map((task, index) => (
          <ToDoItem key={index} task={task} deleteTask={() => deleteTask(index)} />
        ))
      ) : (
        <li>No tasks available</li>
      )}
    </ul>
  );
}

export default ToDoList;
