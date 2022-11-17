const express = require("express")
const Disco = require("../models/disco")
const discoRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");



discoRouter.post("/disco", auth, authAdmin, async (req,res)=>{
    const {title, description, author} = req.body;
    try {
        if(!title || !description || !author){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
    
        }
        if(title.length < 3 || description.length <10 || author.length <3){
            return res.status(400).json({
                success: false,
                message: "Title must be between 3 and 50 characters"
            })
        }
        if(description.length < 3){
            return res.status(400).json({
                success: false,
                message: "Description must be between 10 and 450 characters"
            })
        }
        if(author.length < 3){
            return res.status(400).json({
                success: false,
                message: "Author mus be between 3 and 50 characters"
            })
        }
        let disco = new Disco ({
           title,
           description,
           author
        })
        await disco.save()
        return res.status(200).json({
            success: true,
            disco,
            message: "Disco created successfully"
        })
    }catch (error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
    
}  );


discoRouter.get("/disco/:id", auth, authAdmin, async (req, res) => {
    const {id} = req.params;
    try {
        let disco = await Disco.findById(id)
        return res.status(200).json({
            success: true,
            disco,
            message: "Disc found successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});


discoRouter.get("/discos", auth, authAdmin, async (req, res) => {
    const {id} = req.params;
    try {
        let discos = await Disco.findById({})
        return res.status(200).json({
            success: true,
            discos,
        });
    } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
});


discoRouter.put("/disco/:id", auth, authAdmin, async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body
    try {
        await Disco.findByIdAndUpdate(id, { title, description})
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

discoRouter.delete("/disco/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params;
    try {
        await Disco.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Disc deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = discoRouter;