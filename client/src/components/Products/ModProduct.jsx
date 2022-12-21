import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";




const ModProduct = () => {
    const [product, setProduct] = useState({
        title:"",
        price:"",
        description:"",
        author:"",

    })
    

    const {productId} = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(false);
    const token = localStorage.getItem("token");
    const [successM, setSuccesM] = useState(null)

    useEffect(() =>{
        const getproduct = async() =>{
            const response = await axios.get(`http://localhost:5000/api/product/${productId}`)
            console.log(response)
            setProduct(response.data.producto)
            setImage(response.data.producto.image)
        }
        getproduct()
        
    }, [])
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
            const res = await axios.put(`http://localhost:5000/api/product/${productId}`, {...product, image},
            {
                headers:{
                    Authorization: token
                }
            });



        console.log(res);
        setSuccesM(res.data.message);
        setTimeout(() => {
            navigate(`/product/${productId}`)
        }, 2000);
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div>
            
            <div className="crearp">
            <input type="file" name="file" id="" onChange={handleUpload} />
            <form onSubmit={handleSubmit}>
                <div className="CP">
                <label htmlFor="product">Nombre Producto:</label>
                <input type="text" name="title" onChange={handleChange} id="product" placeholder={product.title}/>
                <label htmlFor="author">Nombre Grupo:</label>
                <input type="text" name="author" onChange={handleChange} id="author" placeholder={product.author}/>
                <label htmlFor="precio">Precio Producto:</label>
                <input type="number" name="price" onChange={handleChange} id="precio" placeholder={product.price}/>
                <label htmlFor="descripcion">Descripción Producto:</label>
                <input type="text" name="description" onChange={handleChange} id="descripcion" placeholder={product.description}/>
                <label htmlFor="categoria">Categoria Producto:</label>
                <input type="text" name="category" onChange={handleChange} id="categoria" placeholder={product.category}/>
                <img src={image.url} alt="imagen" />
                
                <button type="submit" className="botoncp">Modificar producto</button>
                </div>
            </form>
            </div>
        </div>
    )
} 



export default ModProduct;