import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("High");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date();

      setDateTime(
        now.toLocaleDateString() +
          " | " +
          now.toLocaleTimeString()
      );

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const addTask = () => {

    if (taskInput.trim() === "") {
      alert("Please enter a task");
      return;
    }

    setTasks([
      ...tasks,
      {
        text: taskInput,
        priority,
        completed: false,
      },
    ]);

    setTaskInput("");
  };

  const toggleTask = (index) => {

    const updated = [...tasks];

    updated[index].completed =
      !updated[index].completed;

    setTasks(updated);
  };

  const deleteTask = (index) => {

    const updated = [...tasks];

    updated.splice(index, 1);

    setTasks(updated);
  };

  const completedTasks =
    tasks.filter(task => task.completed).length;

  const progress =
    tasks.length === 0
      ? 0
      : (completedTasks / tasks.length) * 100;

  return (
    <div className="container">
      <h1>🚀 Smart Task Manager Pro</h1>

      <div className="datetime">{dateTime}</div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Enter your task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">🌱 Low</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="stats">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="counter">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completedTasks}</span>
        </div>
      </div>

      <div className="task-list">
        <div className="task-suggestions">
          <h4>💡 Task Suggestions</h4>
          <div className="suggestion-list">
            <span>📚 Study for 30 mins</span>
            <span>🚶 Take a short walk</span>
            <span>💧 Drink water</span>
            <span>📝 Plan tomorrow</span>
          </div>
        </div>

        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />

              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>

              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>

            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="footer">Embrace each day by giving every tasks the attenton & priority it deserves</div>
    </div>
  );
}

export default App;