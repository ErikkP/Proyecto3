import React from "react";
import { useEffect } from "react";


const Logout = () => {

  localStorage.removeItem("token")
  localStorage.removeItem("role")
  localStorage.removeItem("name")

  useEffect(() =>{
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  },[])
  
  



    
}

export default Logout;