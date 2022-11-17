const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String, 
    },
    category: {
        
    }, 

},
{timestamps: true}
)




 // const product = await Product.findOne({title});
        // if(product){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Este producto ya está registrado, no puedes registrar de nuevo el mismo producto"
        //     })
        // }