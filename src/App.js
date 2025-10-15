import React, { useState } from "react";
import "./App.css";
import logo from "./components/logo.png";

// placehodler tasks. will be removed after setting up backend on aws
const initialTasks = [
  {
    id: 1,
    text: "Welcome to your task manager",
    description: "You can add descriptions to your tasks for more detail.",
    completed: false,
  },
  { id: 2, text: "Create your first task", description: "", completed: false },
  {
    id: 3,
    text: "Connect to your AWS functions",
    description: "Set up Lambda and API Gateway.",
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      description: newTaskDescription,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
    setNewTaskDescription("");
    setIsAdding(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="task-manager-container">
      <header className="task-manager-header">
        <div className="header-logo">
          <img src={logo} alt="Tasks logo" className="logo-icon" />
          <span>Tasks</span>
        </div>
        <div className="header-stats">
          <span>{incompleteTasks.length} active</span>
          <span className="dot">•</span>
          <span>{completedTasks.length} completed</span>
        </div>
      </header>
      <main className="main-content">
        <p className="task-manager-label">Task Manager</p>
        <h1>Everything you need to do</h1>
        <p className="subtitle">
          A simple, beautiful way to organize your tasks and get things done.
        </p>

        {isAdding ? (
          <form onSubmit={handleAddTask} className="add-task-form-container">
            <input
              type="text"
              className="add-task-input"
              placeholder="Task name..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              autoFocus
            />
            <textarea
              className="add-description-input"
              placeholder="Description (optional)"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <div className="form-actions">
              <button
                type="submit"
                className="add-button"
                disabled={!newTaskText.trim()}
              >
                Add Task
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setIsAdding(false);
                  setNewTaskText("");
                  setNewTaskDescription("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="add-task-container" onClick={() => setIsAdding(true)}>
            <span className="plus-icon">+</span>
            <span>Add a task</span>
          </div>
        )}

        <div className="todo-list-container">
          <h2>To Do</h2>
          <ul className="todo-list">
            {incompleteTasks.map((task) => (
              <li key={task.id} className="todo-item">
                <div className="task-content">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <label htmlFor={`task-${task.id}`}>{task.text}</label>
                </div>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTask(task.id)}
                ></button>
              </li>
            ))}
          </ul>
        </div>

        {completedTasks.length > 0 && (
          <div className="completed-list-container">
            <h2>Completed</h2>
            <ul className="todo-list">
              {completedTasks.map((task) => (
                <li key={task.id} className="todo-item completed">
                  <div className="task-content">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                    />
                    <label htmlFor={`task-${task.id}`}>{task.text}</label>
                  </div>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
