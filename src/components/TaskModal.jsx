import React, { useState, useEffect } from "react";

export default function TaskModal({ task, onClose, onSave, groups }) {
  const [formData, setFormData] = useState(task || {
    nameTask: "",
    description: "",
    category: "General",
    status: "Pendiente",
    dead_line: "",
    group: null, // Nuevo campo para el grupo
  });

  const [selectedGroup, setSelectedGroup] = useState(task?.group || null);

  // Función para formatear la fecha en el formato correcto para México
  const formatDateToLocal = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleString("es-MX", options);
  };

  // Función para convertir la fecha UTC a local para el input
  const formatDateForInput = (date) => {
    const localDate = new Date(date);
    localDate.setHours(localDate.getHours() - 6);
    return localDate.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:mm
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGroupChange = (e) => {
    const groupId = e.target.value;
    setSelectedGroup(groupId);
    setFormData({ ...formData, group: groupId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-120">
        <h2 className="text-2xl font-bold mb-4">{task ? "Editar Tarea" : "Nueva Tarea"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="nameTask" className="font-semibold">Nombre de la tarea:</label>
            <input
              type="text"
              name="nameTask"
              value={formData.nameTask}
              onChange={handleChange}
              placeholder="Nombre de la tarea"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="font-semibold">Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="font-semibold">Categoría:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Importante">Importante</option>
                <option value="General">General</option>
                <option value="Prioridad baja">Prioridad baja</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="font-semibold">Estado:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="En revisión">En revisión</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="dead_line" className="font-semibold">Fecha de entrega:</label>
            <input
              type="datetime-local"
              name="dead_line"
              value={formData.dead_line ? formatDateForInput(formData.dead_line) : ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formData.dead_line && (
              <p className="mt-2 text-sm text-gray-500">
                Fecha de entrega (formato local): {formatDateToLocal(formData.dead_line)}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="group" className="font-semibold">Grupo (opcional):</label>
            <select
              name="group"
              value={selectedGroup || ""}
              onChange={handleGroupChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-Sin Grupo-</option>
              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              {task ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}