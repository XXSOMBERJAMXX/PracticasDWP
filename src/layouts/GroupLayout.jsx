import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import GroupsPage from "../views/Groups/GroupsPage";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtén el token del localStorage
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Si no hay token, redirige al login
      navigate("/login");
    } else {
      // Aquí puedes verificar la validez del token si es necesario
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar el token JWT
      const expirationTime = decodedToken.exp * 1000; // Convertir el tiempo de expiración a milisegundos
      if (Date.now() > expirationTime) {
        // Si el token ha expirado, redirige al login
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Barra lateral fija */}
      <div className="w-64 fixed h-full py-6 px-4 ">
        <Sidebar />
      </div>

      {/* Contenido principal con scroll */}
      <div className=" flex-1 h-screen w-full pl-64 overflow-auto p-6">
        <GroupsPage />
      </div>
    </div>
  );
}
