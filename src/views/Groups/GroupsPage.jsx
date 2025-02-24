import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import TaskList from "../../components/TaskList";
import TaskModal from "../../components/TaskModal";
import GroupList from "../../components/GroupList"; // Nuevo componente
import GroupModal from "../../components/GroupModal"; // Nuevo componente

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const [groups, setGroups] = useState([]); // Estado para grupos
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false); // Estado para modal de grupos
  const [selectedGroup, setSelectedGroup] = useState(null); // Estado para el grupo seleccionado


  const fetchGroups = async () => {
    try {
      const response = await fetch("http://localhost:3001/groups", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) setGroups(data.groups);
    } catch (error) {
      console.error("Error al obtener grupos:", error);
    }
  };

  const addOrUpdateGroup = async (group) => {
    try {
      let response;
      if (group._id) {
        // Actualizar grupo
        response = await fetch(`http://localhost:3001/groups/${group._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(group),
        });
      } else {
        // Crear nuevo grupo
        response = await fetch("http://localhost:3001/groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(group),
        });
      }
      const data = await response.json();
      if (data.success) {
        fetchGroups(); // Actualizar la lista de grupos
      }
    } catch (error) {
      console.error("Error al guardar grupo:", error);
    }
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroup(groupId);
  };

  useEffect(() => {
    fetchGroups();
  }, []);


  const openModal = (task = null) => {
    console.log(task);
    setSelectedTask(task);
    setIsTaskModalOpen(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };


  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 w-full h-full min-h-fit animate-fade-in">
      {/* Lista de grupos */}
      <GroupList groups={groups} handleGroupSelect={handleGroupSelect} />
      
      {/* Botón para crear grupos */}
      <button
        className="fixed bottom-10 right-32 bg-blue-600 hover:bg-blue-800 text-white rounded-full p-4 shadow-lg transition-all w-12 h-12 flex items-center justify-center"
        onClick={() => setIsGroupModalOpen(true)}
      >
        🏠
      </button>

     
      {isGroupModalOpen && (
        <GroupModal onClose={() => setIsGroupModalOpen(false)} onSave={addOrUpdateGroup} />
      )}
    </div>
  );
}