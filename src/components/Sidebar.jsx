import React from "react";
import SidebarMenu from "./SidebarMenu";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-xl p-6 animate-fade-in space-between flex flex-col">
        {/* Nombre de usuario */}
        <div>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800">Diego Morales Rodríguez</h2>
                <p className="text-gray-600">diego@gmail.com</p>
            </div>

            <div>
                {/* Menús desplegables */}
                <SidebarMenu title="Tareas">
                    <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        Mis Tareas
                    </a>
                </SidebarMenu>

                <SidebarMenu title="Proyectos">
                    <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
            <button className=" w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300" onClick={() => {navigate("/");}}>Cerrar Sesión</button>
        </div>
    </div>
  );
}