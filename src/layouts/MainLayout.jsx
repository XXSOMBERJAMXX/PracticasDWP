import React from "react";
import DashboardPage from "../views/Dashboard/DashboardPage";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Barra lateral fija */}
      <div className="w-64 fixed h-full py-6 px-4">
        <Sidebar />
      </div>

      {/* Contenido principal con scroll */}
      <div className="flex-1 pl-64 overflow-auto p-6">
        <DashboardPage />
      </div>
    </div>
  );
}
