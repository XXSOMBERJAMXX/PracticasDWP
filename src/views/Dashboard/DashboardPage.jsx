import React, { useState } from "react";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 w-full h-fit animate-fade-in">
      <Header />
      <TaskForm onAddTask={addTask} />
      <div className="overflow-y-auto max-h-[calc(100vh-335px)]">
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
      </div>
    </div>
  );
}