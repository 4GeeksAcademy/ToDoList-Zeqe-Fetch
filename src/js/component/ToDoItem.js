import React, { useState } from "react";

function ToDoItem({ task, deleteTask }) {
  const [hover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {task}
      {hover && <button onClick={deleteTask}>✖</button>}
    </li>
  );
}

export default ToDoItem;
