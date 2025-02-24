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
  const [roles, setRoles] = useState([]); // Lista de roles disponibles

  // Obtener tareas desde el backend
  const fetchTasks = async (groupId) => {
    const hdr = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    if (groupId) {
      hdr.groupId = groupId;
    }

    try {
      console.log("Grupo seleccionado:", groupId);
      const response = await fetch("http://localhost:3001/tasks", {
        headers: hdr,        
      });
      const data = await response.json();
      if (data.success) setTasks(data.tasks);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

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
    
    fetchTasks(groupId); // Filtrar tareas según el grupo seleccionado
  };

  useEffect(() => {
    fetchRoles();
    fetchTasks(selectedGroup);
    fetchGroups();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:3001/roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) setRoles(data.roles);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  // Calcular el porcentaje de tareas completadas
  const calculateCompletionPercentage = () => {
    if (tasks.length === 0) return 0; // Si no hay tareas, el porcentaje es 0

    const completedTasks = tasks.filter(
      (task) => task.status === "Completado"
    ).length;
    return ((completedTasks / tasks.length) * 100).toFixed(2); // Redondear a 2 decimales
  };

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

  const addOrUpdateTask = async (task) => {
    try {
      let response;
      if (task._id) {
        // Actualizar tarea
        response = await fetch(`http://localhost:3001/tasks/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(task),
        });
      } else {
        // Crear nueva tarea
        response = await fetch("http://localhost:3001/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(task),
        });
      }
      const data = await response.json();
      if (data.success) {
        setTasks((prevTasks) => {
          if (task._id) {
            return prevTasks.map((t) => (t._id === task._id ? task : t));
          } else {
            return [...prevTasks, data.task];
          }
        });
        fetchTasks(selectedGroup);
      }
    } catch (error) {
      console.error("Error al guardar tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        fetchTasks(selectedGroup);
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setIsGroupModalOpen(true);
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      // Verificar si el grupo tiene tareas asociadas
      const response = await fetch(`http://localhost:3001/groups/${groupId}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.tasks.length > 0) {
        alert("No se puede eliminar el grupo porque tiene tareas asociadas.");
        return;
      }

      // Eliminar el grupo
      const deleteResponse = await fetch(`http://localhost:3001/groups/${groupId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const deleteData = await deleteResponse.json();
      if (deleteData.success) {
        fetchGroups(); // Actualizar la lista de grupos
      }
    } catch (error) {
      console.error("Error al eliminar grupo:", error);
    }
  };



  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 w-full h-full min-h-fit animate-fade-in">
      <Header reload={fetchTasks} completionPercentage={calculateCompletionPercentage()} />

      {/* Lista de grupos */}
      <GroupList
        groups={groups}
        handleGroupSelect={handleGroupSelect}
        onEditGroup={handleEditGroup}
        onDeleteGroup={handleDeleteGroup}
      />
      {/* Lista de tareas */}
      <TaskList tasks={tasks} onEdit={openModal} onDelete={deleteTask} />

      {/* Botón para agregar tareas */}
      <button
        className="fixed bottom-10 right-12 bg-green-600 hover:bg-green-800 text-white rounded-full p-4 shadow-lg transition-all w-12 h-12 flex items-center justify-center"
        onClick={() => setIsTaskModalOpen(true)}
      >
        +
      </button>

      {/* Botón para crear grupos */}
      <button
        className="fixed bottom-10 right-32 bg-blue-600 hover:bg-blue-800 text-white rounded-full p-4 shadow-lg transition-all w-12 h-12 flex items-center justify-center"
        onClick={() => setIsGroupModalOpen(true)}
      >
        🏠
      </button>

      {/* Modales */}
      {isTaskModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={addOrUpdateTask}
          groups={groups} // Pasar la lista de grupos al modal
        />      
      )}
      {isGroupModalOpen && (
        <GroupModal
          onClose={() => setIsGroupModalOpen(false)}
          onSave={addOrUpdateGroup}
          group={selectedGroup}
          roles={roles}
        />
      )}
    </div>
  );
}