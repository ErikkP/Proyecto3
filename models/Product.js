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