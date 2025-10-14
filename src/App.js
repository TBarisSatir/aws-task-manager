import React, { useState } from "react";
import "./TaskManager.css";
import logo from "./components/logo.png";

// placehodler tasks. will be removed after setting up backend on aws
const initialTasks = [
  { id: 1, text: "Welcome to your task manager", completed: false },
  { id: 2, text: "Create your first task", completed: false },
  { id: 3, text: "Connect to your AWS functions", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

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
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
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
            <div className="input-wrapper">
              <input
                type="text"
                className="add-task-input"
                placeholder="Task name..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="add-button"
                disabled={!newTaskText.trim()}
              >
                Add
              </button>
            </div>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
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
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />
                <label htmlFor={`task-${task.id}`}>{task.text}</label>
                {/* YENİ: Silme butonu */}
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

        {completedTasks.length > 0 && (
          <div className="completed-list-container">
            <h2>Completed</h2>
            <ul className="todo-list">
              {completedTasks.map((task) => (
                <li key={task.id} className="todo-item completed">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <label htmlFor={`task-${task.id}`}>{task.text}</label>
                  {/* YENİ: Silme butonu */}
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
