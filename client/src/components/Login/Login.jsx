import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };
  console.log(info);
  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        ...info,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("name", response.data.user.name);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      //   localStorage.getItem("token")
      setSuccessM(response.data.message);
    } catch (error) {
      setErrorM(error.response.data.message);
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 3000);
    }
  };

  return (
    <div className="Login2">
      <h1 className="Login">Iniciar sesión</h1>
      <form className="formulario" onSubmit={loginSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Correo electrónico:
          </label>
          <input
            name="email"
            value={info.email}
            onChange={onChangeInput}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            No compartiremos tu email con nadie.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            value={info.password}
            onChange={onChangeInput}
          />
        </div>
        {/* <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" class="btn btn-dark">
          Iniciar sesión
        </button>
        <div className="mb-3">
          <label htmlFor="" className="bton">
            ¿No tienes cuenta?
            <button class="btn btn-secondary" id="register">
              <a href="/register">Registrarse</a>
            </button>
          </label>
        </div>
        <div
          class="alert alert-primary"
          role="alert"
          style={{ display: successM ? "block" : "none" }}
        >
          {successM}
        </div>
        <div
          class="alert alert-danger"
          role="alert"
          style={{ display: errorM ? "block" : "none" }}
        >
          {errorM}
        </div>
      </form>
    </div>
  );
};

export default Login;
