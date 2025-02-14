// components/TaskForm.jsx
import React, { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Agregar una nueva tarea"
          className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-r-lg shadow-md transition-all duration-300"
        >
          Agregar
        </button>
      </div>
    </form>
  );
}