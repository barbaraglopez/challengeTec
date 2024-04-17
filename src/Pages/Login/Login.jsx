import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../../Context/AuthContext";
import logo from "./LoguinIcon.png";
import { Modal } from "../../Components/Modal/Modal.jsx";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const apiUrl = "https://www.mockachino.com/06c67c77-18c4-45/login";
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username: email,
      password: password,
    };

    if (email !== "tom.manchini@yopmail.com") {
      setErrorMsg("El email ingresado no es válido.");
      openModal();
    } else if (password !== "1234") {
      setErrorMsg("La contraseña ingresada no es válida.");
      openModal();
    } else {
      axios
        .post(apiUrl, userData)
        .then((response) => {
          console.log(
            "Envío exitoso. Token de acceso:",
            response.data.access_token
          );
          localStorage.setItem("accessToken", response.data.access_token);
          setIsLoggedIn(true);
          navigate("/users");
        })
        .catch((error) => {
          openModal();
          console.error("Error al realizar la solicitud:", error);
          setErrorMsg("Error para ingresar");
        });
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      navigate("/users");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        message={errorMsg}
      />
      <section className="page login-1">
        <div className="login-1-background"></div>
        <div className="login-1-card">
          <img src={logo} alt="Logo" />
          <h2>Loguin</h2>
          {isLoggedIn ? (
            <div>
              <p>
                ¡Has iniciado sesión correctamente!{" "}
                <a href="#" onClick={handleLogout}>
                  Cerrar sesión
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                className="inputForm"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                className="inputForm"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button type="submit">Sign In</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};
