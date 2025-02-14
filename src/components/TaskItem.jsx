// components/TaskItem.jsx
import React from "react";

export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-4"
        />
        <span className={`text-gray-800 ${task.completed ? "line-through" : ""}`}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
      >
        Eliminar
      </button>
    </div>
  );
}