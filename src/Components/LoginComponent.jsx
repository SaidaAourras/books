import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await dispatch(login(credentials)).unwrap();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/bookList");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center" style={{ color: "#c6564b" }}>
          Se connecter
        </h2>
        <div className="mb-3">
          <label
            htmlFor="username"
            className="form-label"
            style={{ fontWeight: "bold", color: "#6c757d" }}
          >
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="form-control"
            style={{
              borderRadius: "5px",
              borderColor: "#d29372",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
            style={{ fontWeight: "bold", color: "#6c757d" }}
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="form-control"
            style={{
              borderRadius: "5px",
              borderColor: "#d29372",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <button
          onClick={handleLogin}
          className="btn btn-block w-100"
          disabled={loading}
          style={{
            backgroundColor: "#d29372",
            color: "#fff",
            borderRadius: "25px",
            padding: "10px 20px",
            fontWeight: "bold",
            border: "none",
          }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
