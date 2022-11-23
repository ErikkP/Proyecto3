const express = require ("express");
const Product = require("../models/Product");
const productRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");


productRouter.post("/product", auth, authAdmin, async (req,res) => {
    try {
        const {title, price, description, category, image} = req.body;
        if(!title || !price || !description || !category || !image) {
            return res.status(400).json({
                success: false,
                message: "Por favor, completa todos los campos"
            });
        }

        const newProduct = new Product({
            title, 
            price,
            description,
            category,
            image
        });

        await newProduct.save();
        return res.status(200).json({
            success: true, 
            newProduct,
            message: "Producto creado con éxito",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

module.exports = productRouter;