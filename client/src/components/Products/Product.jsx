import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";


const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState({});
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/product/${productId}`
      );
      setProduct(response.data.producto);
      setImage(response.data.producto.image);
    };
    getProduct();
  }, []);

  const deleteProduct = async (e) => {
    e.preventDefault();
    let option = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (option == true) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/product/${productId}`,
          { headers: { Authorization: token } }
        );
        console.log(response);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div className="body-product">
      {/* <h1>{product.title}</h1>
            <img src={image.url} alt={"producto imagen"} />
            <h5>{product.price} €</h5>
            <p>{product.description}</p>
            <Link to={"/"}>
                <button>Volver a la página principal</button>
            </Link> */}
      <div className="tproduct">
        <img src={image.url} className="card-img-top imagenprod" alt="..." />
        <div className="producto">

          <div className="card-body">
          <h2 className="card-text precio h2">{product.price}€</h2>
          <a href="/cart" className="h2"><i class="fa-solid fa-cart-plus fa-lg "></i></a>
            <h3 className="card-title">Título: {product.title}</h3>
            <h3 className="card-text autor">Grupo autor: {product.author}</h3>
            <h3 className="card-text categoria">Categoria: {product.category}</h3>

            <p className="card-text descripcion">
              Descripción: {product.description}
            </p>
          </div>
          
        </div>


        <div className="bot-prod">
        <a href="/cart" class="btn btn-dark">
            Añadir al carrito
          </a>
          <a href="/" class="btn btn-secondary">
            Volver al inicio
          </a>
          {role == 1 ? (
            <button onClick={deleteProduct} class="btn btn-secondary">
              Eliminar producto
            </button>
          ) : (
            <></>
          )}
          {role == 1 ? (
            <Link to={`/mod_product/${productId}`}>
              <button class="btn btn-dark">Modificar Producto</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>

  );
};

export default Product;
