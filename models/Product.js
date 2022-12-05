const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    category: {
        type: String,
    },
    image: {
        type: Object
    }
},
{timestamps: true}
);




 // const product = await Product.findOne({title});
        // if(product){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Este producto ya está registrado, no puedes registrar de nuevo el mismo producto"
        //     })
        // }

module.exports = mongoose.model("Product", productSchema);