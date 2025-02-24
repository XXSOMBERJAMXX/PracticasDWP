import React, { useState } from "react";

export default function Header({ reload, completionPercentage }) {
  const [clickCount, setClickCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 4) {
      setDisabled(true);
      setTimeout(() => {
        setClickCount(0);
        setDisabled(false);
      }, 10000);
    } else {
      reload();
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 rounded-lg mb-4 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Administrador de Tareas</h1>
        <p className="text-gray-600">Gestiona tus tareas de manera eficiente</p>
      </div>
      <div className="flex items-center">
        {/* Mostrar el porcentaje de tareas completadas */}
        <p className="text-sm text-green-600 mr-4">
          Progreso: <span className="font-semibold">{completionPercentage}%</span>
        </p>
        <button
          onClick={handleClick}
          disabled={disabled}
          className={`${
            disabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            strokeWidth="2.25"
          >
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
