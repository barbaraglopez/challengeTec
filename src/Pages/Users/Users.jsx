import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import "./Users.css";

export const Users = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userFullName } = useAuth();
  const [users, setUsers] = useState([]);
  const usersUrl = "https://www.mockachino.com/06c67c77-18c4-45/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(usersUrl);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="users-container">
      {isLoggedIn ? (
        <>
          <div className="navbar">
            <p className="title">
              Hola {userFullName.userName} {userFullName.userLastname}
            </p>
            <button className="buttonLogout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
          <h2>Dashboard</h2>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Foto</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Género</th>
                  <th>Teléfono</th>
                  <th>Profesión</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.contactId}>
                    <td>{user.name}</td>
                    <td>{user.surnames}</td>
                    <td>
                      {user.photo ? (
                        <img
                          src={user.photo}
                          alt={`${user.name} ${user.surnames}`}
                          className="user-photo"
                        />
                      ) : (
                        <div className="no-photo">No hay foto</div>
                      )}
                    </td>
                    <td>{user.birthDate}</td>
                    <td>{user.gender}</td>
                    <td>{user.phone}</td>
                    <td>{user.profesion}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
};
