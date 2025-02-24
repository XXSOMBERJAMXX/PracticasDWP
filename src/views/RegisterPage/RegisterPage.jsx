import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", username: "", password: "" });
  const navigate = useNavigate();

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validateUsername = (value) => /^[^\s]+$/.test(value);
  const validatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value) ? "" : "Ingresa un correo válido.",
    }));
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrors((prev) => ({
      ...prev,
      username: validateUsername(value) ? "" : "El nombre de usuario no debe contener espacios.",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value)
        ? ""
        : "Mínimo 8 caracteres, incluyendo letras y números.",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registro exitoso");
        navigate("/login");
      } else {
        alert("Error en el registro");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Hubo un problema al registrar");
    }
  };

  const isValid = email && username && password && !errors.email && !errors.username && !errors.password;

  return (
    <section className="flex items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="rounded-3xl bg-white relative items-center w-fit px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col">
            <h2 className="text-4xl text-black">Regístrate</h2>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mt-4 space-y-6">
              {/* Campo de Nombre de Usuario */}
              <div className="col-span-full">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="username">Nombre de Usuario:</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="new-password"
                  placeholder="nombreusuario"
                  className={`block w-full px-6 py-3 text-black bg-white border ${errors.username ? "border-red-500" : "border-gray-200"} rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                  onChange={handleUsernameChange}
                />
                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
              </div>

              {/* Campo de Correo */}
              <div className="col-span-full">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="email">Correo:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="new-password"
                  placeholder="ejemplo@gmail.com"
                  className={`block w-full px-6 py-3 text-black bg-white border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                  onChange={handleEmailChange}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              

              {/* Campo de Contraseña */}
              <div className="col-span-full">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="password">Contraseña:</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="********"
                  className={`block w-full px-6 py-3 text-black bg-white border ${errors.password ? "border-red-500" : "border-gray-200"} rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                  onChange={handlePasswordChange}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Botón de Registro */}
              <div className="col-span-full">
                <button
                  type="submit"
                  className={`items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black ${isValid ? "" : "opacity-50 cursor-not-allowed"}`}
                  disabled={!isValid}
                >
                  Registrarse
                </button>
              </div>
              <a
                onClick={() => navigate("/login")}
                className="block text-center text-sm text-gray-600 hover:underline"
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

