import React from "react";

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800">{task.nameTask}</h3>
      <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: task.description.replace(/\n/g, "<br>") }}></p>
      <div className="flex flex-col mt-auto">
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-200 text-gray-700">
            {task.category}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              task.status === "Completado"
                ? "bg-green-200 text-green-700"
                : task.status === "En progreso"
                ? "bg-blue-200 text-blue-700"
                : task.status === "Pendiente"
                ? "bg-yellow-200 text-yellow-700"
                : "bg-purple-200 text-purple-700"
            }`}
          >
            {task.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">
          {new Date(task.dead_line).toLocaleString("es-MX", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="mt-auto flex justify-between">
          <button onClick={() => onEdit(task)} className="text-blue-500 hover:underline">
            ✏️ Editar
          </button>
          <button onClick={() => onDelete(task._id)} className="text-red-500 hover:underline">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}