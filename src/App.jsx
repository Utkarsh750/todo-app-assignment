import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import "./App.css";
import { AiFillEdit } from "react-icons/ai";

function App() {
  const [todos, setTodos] = useState(() => {
    // Load TODOs from local storage on app starts
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  // Update local storage whenever TODOs change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (task.trim() !== "") {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditTask(todos[index]);
  };

  const handleSaveEdit = () => {
    if (editTask.trim() !== "") {
      const newTodos = todos.map((todo, index) =>
        index === editIndex ? editTask : todo
      );
      setTodos(newTodos);
      setIsEditing(false);
      setEditIndex(null);
      setEditTask("");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App</h1>
        <div className="todo-input">
          <input
            type="text"
            placeholder="Add a new task"
            value={isEditing ? editTask : task}
            onChange={(e) =>
              isEditing ? setEditTask(e.target.value) : setTask(e.target.value)
            }
          />
          <button onClick={isEditing ? handleSaveEdit : handleAddTodo}>
            <IoIosAddCircle />
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <div>
                <button onClick={() => handleEditTodo(index)}><AiFillEdit /></button>
                <button onClick={() => handleRemoveTodo(index)}>
                  <MdDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
