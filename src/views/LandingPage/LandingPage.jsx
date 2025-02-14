import { useState } from "react";

export default function LandingPage() {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg text-center animate-fade-in">
        {/* Imagen decorativa */}
        <img
          src="img/welcome.jpg"
          alt="Welcome"
          className="rounded-lg mx-auto mb-6 shadow-md"
        />

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Bienvenido!</h1>
        <p className="text-gray-600 mb-6 text-lg">
          Accede a nuestra plataforma y mejora tu la gestión de tus tareas.
        </p>

        {/* Botones de acción */}
        <div className="flex justify-center space-x-4">
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Iniciar sesión
          </a>
          <a
            href="/register"
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}
