const mongoose = require("mongoose");
const discoSchema = new mongoose.Schema({
    title:{
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    description:{
        type: String,
        maxlength: 450,
        minlength: 10,
        required: true
    },
    author:{
        type: String,
    }
}, {timestamps:true});

module.exports = mongoose.model("Disco", discoSchema)