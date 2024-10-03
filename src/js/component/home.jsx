import React, { useEffect, useState } from "react";



//create your first component
const user = "ezebellino"

function Home() {
	const [tareas, setTareas] = useState([]);
	const [nuevaTarea, setNuevaTarea] = useState("");

	useEffect(() => {
		getTodos(user)
	}, [])

	const getTodos = (user) => {
		fetch(`https://playground.4geeks.com/todo/users/${user}`, {
		}).then((response) => response.json()).then((data) => {
			console.log(data)
			setTareas(data.todos)
		})
	}

	const addToDo = (user, tarea) => {
		fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
			method: "POST",
			body: JSON.stringify(tarea),
			headers: {
				"Content-type": "application/json"
			}
		}).then((response) => response.json()).then((data) => {
			console.log(data);
			tarea.id = data.id
			setTareas([...tareas, tarea]);
			setNuevaTarea("");
		})
	}


	const deleteToDo = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json"
			}
		}).then(() => {
			const nuevasTareas = tareas.filter((tareas) => tareas.id !== id);
			setTareas(nuevasTareas)
		})
	}

	const handlerKeyDown = (e) => {
		if (e.key === "Enter" && nuevaTarea.trim() !== "") {
			let newTask = { "label": nuevaTarea, "is_done": false }
			addToDo(user, newTask)
		}
	};

	const eliminarTarea = (id) => {

		deleteToDo(id);
	};

	return (
		<div className="list" id='list'>
			<h1><strong>ToDoList</strong></h1>
			<div className="input">
				<input type="text" placeholder="Por favor agregar tareas!"
					value={nuevaTarea}
					onChange={(e) => setNuevaTarea(e.target.value)} onKeyDown={handlerKeyDown} // Capturar el evento de "Enter"
				/>
			</div>

			<ul style={{ listStyleType: "none", padding: 0 }}>
				{tareas.map((tarea, index) => (
					<li key={tarea.id} style={{ margin: "10px 0", position: "relative" }}>
						{tarea.label}
						<button onClick={() => eliminarTarea(tarea.id)}>X</button>
					</li>
				))}
			</ul>
			<div id="itemleft"><strong>{tareas.length} item left</strong></div>

		</div>

	);
}

export default Home;