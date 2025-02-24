import React, { useState } from "react";

export default function GroupList({ groups, handleGroupSelect, onEditGroup, onDeleteGroup }) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (groupId) => {
    if (selectedGroup === groupId) {
      // Si el grupo ya está seleccionado, lo deseleccionamos
      setSelectedGroup(null);
      handleGroupSelect(null); // Notificar al componente padre que no hay grupo seleccionado
    } else {
      // Seleccionar el nuevo grupo
      setSelectedGroup(groupId);
      handleGroupSelect(groupId); // Notificar al componente padre el grupo seleccionado
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Mis Grupos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.length === 0 ? (
          <p className="text-gray-500">No perteneces a ningún grupo.</p>
        ) : (
          groups.map((group) => (
            <div
              key={group._id}
              className={`bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all ${
                selectedGroup === group._id ? "border-2 border-blue-500" : ""
              }`}
            >
              <div className="cursor-pointer" onClick={() => handleGroupClick(group._id)}>
                <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
                <p className="text-gray-600 text-sm">{group.description}</p>
                <div className="mt-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-200 text-blue-700">
                    Miembros: {group.members.length}
                  </span>
                </div>
              </div>

              <div className="mt-auto flex justify-between">
                <button
                  onClick={() => {onEditGroup(group); }}
                  className="text-blue-500 hover:underline"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => onDeleteGroup(group._id)}
                  className="text-red-500 hover:underline"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}