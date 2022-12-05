import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [info, setInfo] = useState({
      name: "",
      email: "",
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
        setSuccessM(response.data.message)
      } catch (error) {
        setErrorM(error.response.data.message);
        // setTimeout(() => {
        //   window.location.href = "/register";
        // }, 3000);
      }
    };
  
    return (
        <div>
          <h1>Register</h1>
          <form className="formulario" onSubmit={registerSubmit}>
          <div class="mb-3">
              <label for="exampleInputName1" class="form-label">
                Name
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
                Email address
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
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
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
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
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
        </div>
    );
  };

export default Register;
