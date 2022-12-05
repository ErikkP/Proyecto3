import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const Products = () =>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get("http://localhost:5000/api/products");
            // console.log(response)
            console.log(response.data);
            setProducts(response.data.products);
        };
        getProducts();
    }, []);

    return (
        <div>
            <h1>Productos</h1>
            {
                products.map((producto) => {
                    return(
                        <div>
                            <h2>{producto.title}</h2>
                            <h5>{producto.price}</h5>
                            <p>{producto.description}</p>
                            <img src={producto.image.url} alt={"imagen product"}/>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Products;