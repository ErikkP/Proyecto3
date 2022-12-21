import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

const Products = () => {
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
      <h1 className="h1">Productos</h1>
      <p><i class="fa-solid fa-arrow-down-long fa-lg sep"></i></p>
      {/* <p className="sep">V</p> */}
      {products.map((producto) => {
        return (
          <Link key={producto._id} to={`/product/${producto._id}`} className="products">
          <div className="Producto-home">
            <img src={producto.image.url} alt={"producto imagen"} className="imagenP"/>
            <h2>Albúm: {producto.title}</h2>
            <h4>Grupo: {producto.author}</h4>
            <h4>Género: {producto.category}</h4>
            <h4>{producto.price} €</h4>
            <p className="descP">{producto.description}</p>
          </div>
          </Link>  
        );
      })}
    </div>
  );
};

export default Products;
