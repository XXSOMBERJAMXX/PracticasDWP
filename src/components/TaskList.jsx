import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete }) {
  // Función para agrupar las tareas por estado
  const groupTasksByStatus = (tasks) => {
    const groupedTasks = {
      "Pendiente": [],
      "En progreso": [],
      "En revisión": [],
      "Completado": [],
    };

    tasks.forEach((task) => {
      if (groupedTasks[task.status]) {
        groupedTasks[task.status].push(task);
      }
    });

    return groupedTasks;
  };

  const groupedTasks = groupTasksByStatus(tasks);

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div key={status} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{status}</h2>
          <div className="overflow-y-auto max-h-[500px] space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center">No hay tareas en este estado.</p>
            ) : (
              tasks.map((task) => (
                <TaskItem key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}