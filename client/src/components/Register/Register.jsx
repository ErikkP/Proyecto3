import React, { useState } from "react";
import axios from "axios";


const Register = () => {
    const [info, setInfo] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    });
  
    const [successM, setSuccessM] = useState(null);
    const [errorM, setErrorM] = useState(null);
  
    const onChangeInput = (event) => {
      const { name, value } = event.target;
      setInfo({ ...info, [name]: value });
    };
    console.log(info)
    const registerSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/register", {
          ...info,
        });
        console.log(response);
        localStorage.setItem("token", response.data.accessToken);
        //   localStorage.getItem("token")
        setTimeout(()=>{
          window.location.href="/login"
        }, 3000)
        setSuccessM(response.data.message)
      } catch (error) {
        setErrorM(error.response.data.message);
        setTimeout(() => {
          window.location.href = "/register";
        }, 3000);
      }
    };
  
    return (
        <div className="Login2">
          <h1 className="Login">Registro</h1>
          <form className="formulario" onSubmit={registerSubmit}>
          <div class="mb-3">
              <label for="exampleInputName1" class="form-label">
                Nombre:
              </label>
              <input
                type="name"
                class="form-control"
                id="exampleInputName1"
                name="name"
                value={info.name}
                onChange={onChangeInput}
              />
            </div>
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
              <label for="exampleInputName1" class="form-label">
                Dirección:
              </label>
              <input
                type="address"
                class="form-control"
                id="exampleInputAddress1"
                name="address"
                value={info.address}
                onChange={onChangeInput}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputName1" class="form-label">
                Número de teléfono:
              </label>
              <input
                type="phone"
                class="form-control"
                id="exampleInputPhoneNumber1"
                name="phone"
                value={info.phone}
                onChange={onChangeInput}
              />
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
            <button type="submit" class="btn btn-secondary">
              Registrarse
            </button>
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

export default Register;
