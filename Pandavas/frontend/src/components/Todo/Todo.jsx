import React, { useState, useEffect } from "react";
import "./Todo.css"; // Import the CSS file

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingPriority, setEditingPriority] = useState("");

  // Fetch todos from the Flask backend when the component mounts.
  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // Create a new todo item.
  const addTodo = () => {
    if (!newTodo.trim()) return;
    fetch("http://127.0.0.1:5001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo, priority: newTodoPriority }),
    })
      .then((res) => res.json())
      .then((todo) => {
        const updatedTodos = [...todos, todo].sort((a, b) => b.priority - a.priority);
        setTodos(updatedTodos);
        setNewTodo("");
        setNewTodoPriority(0);
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  // Delete a todo item.
  const deleteTodo = (id) => {
    fetch(`http://127.0.0.1:5001/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  // Begin editing a todo item.
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
    setEditingPriority(todo.priority);
  };

  // Cancel editing mode.
  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
    setEditingPriority("");
  };

  // Update a todo item.
  const updateTodo = (id) => {
    if (!editingText.trim()) return;
    fetch(`http://127.0.0.1:5001/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editingText, priority: editingPriority }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        const updatedTodos = todos
          .map((todo) => (todo.id === id ? updatedTodo : todo))
          .sort((a, b) => b.priority - a.priority);
        setTodos(updatedTodos);
        cancelEditing();
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      
      {/* Add New Todo Section */}
      <div className="add-todo">
        <div className="form-group">
          <label htmlFor="newTodo">Todo Description:</label>
          <input
            id="newTodo"
            type="text"
            placeholder="Enter new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newTodoPriority">
            Priority (higher number = higher priority):
          </label>
          <input
            id="newTodoPriority"
            type="number"
            placeholder="Priority"
            value={newTodoPriority}
            onChange={(e) => setNewTodoPriority(Number(e.target.value))}
          />
        </div>
        <button className="btn-add" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label htmlFor={`editText-${todo.id}`}>Edit Todo Description:</label>
                  <input
                    id={`editText-${todo.id}`}
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`editPriority-${todo.id}`}>Edit Priority:</label>
                  <input
                    id={`editPriority-${todo.id}`}
                    type="number"
                    value={editingPriority}
                    onChange={(e) => setEditingPriority(Number(e.target.value))}
                  />
                </div>
                <div className="action-buttons">
                  <button className="btn-save" onClick={() => updateTodo(todo.id)}>
                    Save
                  </button>
                  <button className="btn-cancel" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="todo-details">
                <div className="todo-text">{todo.text}</div>
                <div className="todo-priority">Priority: {todo.priority}</div>
                <div className="todo-actions">
                  <button className="btn-edit" onClick={() => startEditing(todo)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
