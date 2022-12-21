import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const ModUser = () => {

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    

    const {userId} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [successM, setSuccesM] = useState(null)

    useEffect(() => {
        const getUser = async () => {
          const response = await axios.get("http://localhost:5000/api/user", {
            headers: {
              Authorization: token
            }
          });
          console.log(response)
          console.log(response.data);
          setUser(response.data.user);
        };
        getUser();
      }, []);

    // console.log(image.url)

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    console.log(user)
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const res = await axios.put("http://localhost:5000/api/user", {...user},
            {
                headers:{
                    Authorization: token
                }
            });



        console.log(res);
        setSuccesM(res.data.message);
        setTimeout(() => {
            navigate("/profile")
        }, 2000);
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div>
            
            <div className="crearp">
            <form onSubmit={handleSubmit}>
                <div className="CP">
                <label htmlFor="name">Nombre:</label>
                <input type="text" name="name" onChange={handleChange} id="name" placeholder={user.name}/>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" onChange={handleChange} id="email" placeholder={user.email}/>
                <label htmlFor="addres">Dirección:</label>
                <input type="text" name="price" onChange={handleChange} id="address" placeholder={user.address}/>
                <label htmlFor="phone">Número de telefono:</label>
                <input type="text" name="phone" onChange={handleChange} id="phone" placeholder={user.phone}/>
                <label htmlFor="password">Contraseña:</label>
                <input type="text" name="password" onChange={handleChange} id="password" placeholder={user.password}/>
                
                
                <button type="submit" className="botonmf">Modificar perfil</button>
                </div>
            </form>
            </div>
        </div>
    )
}


export default ModUser;