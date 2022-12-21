import React from "react";
import { useState } from "react";
import axios from "axios";



const CreateProduct = () => {
    const [product, setProduct] = useState({
        name:"",
        price:"",
        description:"",
        category:"",
    })

    const [image, setImage] = useState(false)
    const token = localStorage.getItem("token")


    const handleUpload = async(e) =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            if(!file) return alert("no se ha subido la imagen")


            let formData = new FormData()
            formData.append("file", file)
            const response = await axios.post("http://localhost:5000/api/upload", formData, {
                headers:{
                    "Authorization": token,
                    "content-type": "multipart/form-data"
                }
            })

            setImage(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    // console.log(image.url)

    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }
    console.log(product)
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/api/product", {...product, image},
            {
                headers:{
                    Authorization: token
                }
            })
        console.log(res)
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div>
            <div className="crearp">
            <input type="file" name="file" id="" onChange={handleUpload} className="inputCP"/>
            <img src={image.url} alt="imagen" className="imgCP"/>
            <form onSubmit={handleSubmit}>
                <div className="CP">
                <label htmlFor="product">Nombre Producto:</label>
                <input type="text" name="title" onChange={handleChange} id="product"/>
                <label htmlFor="author">Nombre Grupo:</label>
                <input type="text" name="author" onChange={handleChange} id="author"/>
                <label htmlFor="precio">Precio Producto:</label>
                <input type="number" name="price" onChange={handleChange} id="precio"/>
                <label htmlFor="descripcion">Descripción Producto:</label>
                <input type="text" name="description" onChange={handleChange} id="descripcion"/>
                <label htmlFor="categoria">Categoria Producto:</label>
                <input type="text" name="category" onChange={handleChange} id="categoria"/>
                
                
                <button type="submit" className="botoncp">Crear producto</button>
                </div>
            </form>
            </div>
        </div>
    )
}




export default CreateProduct;