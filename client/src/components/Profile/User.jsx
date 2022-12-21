import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";



const User = () => {
    const [user, setUser] = useState([]);
    const token = localStorage.getItem("token")
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: token
        }
      });
      // console.log(response)
      console.log(response.data);
      setUser(response.data.user);
    };
    getUser();
  }, []);

  return (
    <div>
      {/* {user.map((user) => {
        return (
          <Link key={user._id} to={`/product/${user._id}`} className="user">
          <div className="user-home">
            <h2>Albúm: {user.name}</h2>
            <h4>Grupo: {user.email}</h4>
            <h4>Género: {user.password}</h4>
          </div>
          </Link>  
        );
      })} */}

      <h1>Nombre de usuario: {user.name}</h1>
      <h2>Correo electrónico: {user.email}</h2>
      <h2>Dirección: {user.address}</h2>
      <h2>Número de teléfono: {user.phone}</h2>
      {/* <h3>{user.password}</h3> */}
    </div>
  );
}



export default User;