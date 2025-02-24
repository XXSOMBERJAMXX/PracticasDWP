import React from "react";
import { useState, useEffect } from "react";
import SidebarMenu from "./SidebarMenu";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const [user, setUser] = useState({'username': '...', 'email': '...'});
    const navigate = useNavigate();

    useEffect(() => {
        // Acceder al objeto 'user' guardado en localStorage
        const storedUser = localStorage.getItem("user");
    
        if (storedUser) {
          // Parsear el string JSON a un objeto JavaScript
          setUser(JSON.parse(storedUser));
        }
      }, []);
  return (
    <div className="w-full h-full min-h-fit bg-white rounded-3xl shadow-xl p-6 animate-fade-in space-between flex flex-col">
        {/* Nombre de usuario */}
        <div>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800"> {user.username} </h2>
                <p className="text-gray-600"> {user.email} </p>
            </div>

            <div>
                {/* Menús desplegables */}
                <SidebarMenu title="Tareas">
                    <a href="/main" className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        Mis Tareas
                    </a>
                </SidebarMenu>

                <SidebarMenu title="Proyectos">
                    <a href="/groups" className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        Proyecto 1
                    </a>
                </SidebarMenu>

                <SidebarMenu title="Configuración">
                    <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        Perfil
                    </a>
                </SidebarMenu>
            </div>
        </div>
        

        <div className="mt-auto pt-6 w-full" >
        <button
            className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
            onClick={() => {
                localStorage.clear();  // Limpiar el localStorage
                sessionStorage.clear(); // Limpiar también el sessionStorage
                navigate("/"); // Redirigir al inicio
            }}
        >
            Cerrar Sesión
        </button>

        </div>
    </div>
  );
}