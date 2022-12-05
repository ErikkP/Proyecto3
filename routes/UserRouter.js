const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");


const createToken = (user) => {
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {expiresIn: '7d'});
};


UserRouter.post("/register", async(req,res)=>{
    const {name, email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success: false,
                message: "Este usuario ya está registrado"
            })
        }

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Por favor, rellena todos los campos"
            })
        }

        if(name.length < 3){
            return res.status(400).json({
                success: false,
                message: "El nombre debe tener entre 3 y 50 caracteres"
            })
        }
        
        if(password.length < 6){
            return res.status(400).json({
                success: false ,
                message: "La contraseña debe tener al menos 6 caracteres"
            })
        }

        
        const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 

        const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

       

        if(!validateEmail.test(email)){
            return res.status(400).json({
                success: false,
                message: "El correo no és valido"
            });
        }

        if(!validatePassword.test(password)){
            return res.status(400).json({
                success: false,
                message: "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
            });
        }
        

        let passwordHash = bcrypt.hashSync(password, salt);
        let newUser = new User ({
            name,
            email,
            password:passwordHash,
        });

        await newUser.save()
        const accessToken = createToken({ id: newUser._id })
        return res.status(200).json({
            success: true,
            newUser,
            message: "Usuario creado con éxito",
            accessToken,
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
});

UserRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Alguno de los datos son incorrectos (correo)"
            })
        }
        const passwordOK = bcrypt.compareSync(password, user.password);
        if(!passwordOK){
            return res.status(400).json({
                success: false,
                message: "Alguno de los datos son incorrectos (password)"
            })
        }
        const accessToken = createToken({ id: user._id })
        return res.status(200).json({
            success: true,
            message:"Usuario logueado con éxito",
            accessToken,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

UserRouter.put("/user", auth, async (req, res) => {
    const {role} = req.body
    try {
        await User.findByIdAndUpdate(req.user.id, {role})
        return res.status(200).json ({
            success: true,
            message: "User updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

UserRouter.get("/user", auth, async (req, res)=>{
    try {
        const user = await User.findById(req.user.id);
        if (!user)
        return res.status(400).json({
            success: false,
            message: "Usuario no encontrado"
        });
        return res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

UserRouter.get("/users", auth, authAdmin, async (req,res)=>{
    try {
        let users = await User.find({}).select("name email")
        if(!users){
            return res.status(400).json({
                success: false,
                message: "No hay usuarios en la base de datos"
            })
        }
        return res.status(200).json({
            success: true,
            users,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

UserRouter.post("/cart", auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        if(!user)
        return res.status(400).json({
            success: false,
            message: "Usuario no encontrado",
        });
        await User.findOneAndUpdate({_id:req.user.id}, { cart: req.body.cart })
        return res.status(200).json({
            success: true,
            message: "Producto añadido con exito"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
})


module.exports = UserRouter;