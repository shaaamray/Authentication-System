// model is a skeleton of what data's will be there and how they will be co-related.

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
})

module.exports = mongoose.model('User', userSchema);