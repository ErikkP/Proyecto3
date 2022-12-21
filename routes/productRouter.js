const express = require ("express");
const Product = require("../models/Product");
const productRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");


productRouter.post("/product", auth, authAdmin, async (req,res) => {
    try {
        const {title, author, price, description, category, image} = req.body;
        if(!title ||!author || !price || !description || !category || !image) {
            return res.status(400).json({
                success: false,
                message: "Por favor, completa todos los campos"
            });
        }

        const newProduct = new Product({
            title, 
            author,
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

productRouter.put("/product/:id", auth, authAdmin, async (req, res) => {
    const {id} = req.params;
    const {title, description, author, price, image} = req.body
    try {
        await Product.findByIdAndUpdate(id, { title, description, author, price, image})
        return res.status(200).json ({
            success: true,
            message: "Disc updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

productRouter.delete("/product/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

productRouter.get("/products", async (req,res)=> {
    try{
    let products = await Product.find();
    return res.status(200).json({
        success: true,
        products,
        message: "Productos obtenidos con éxito"
    })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }


})

productRouter.get("/product/:id", async (req, res) => {
    const {id} = req.params;
    try {
        let producto = await Product.findById(id)
        return res.status(200).json({
            success: true,
            producto,
            message: "Product found successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

module.exports = productRouter;