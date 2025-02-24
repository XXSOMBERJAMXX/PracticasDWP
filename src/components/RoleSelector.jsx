import React, { useState, useEffect } from "react";

export default function RoleSelector({ roles, onSelectRole }) {
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (roles.length > 0) {
      setSelectedRole(roles[0]._id); // Selecciona el primer rol por defecto
    }
  }, [roles]);

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
    onSelectRole(e.target.value);
  };

  return (
    <div>
      <label htmlFor="role" className="font-semibold">Rol:</label>
      <select
        id="role"
        value={selectedRole}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {roles.map((role) => (
          <option key={role._id} value={role._id}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
}