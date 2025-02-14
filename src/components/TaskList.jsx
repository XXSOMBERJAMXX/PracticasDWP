// components/TaskList.jsx
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <div className="mt-6">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
}