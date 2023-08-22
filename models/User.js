const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true,"name is required"]
    },
    email: {
        type: String,
        required: [true,"email is required"],
        match :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,


    },
    password: {
        type: String,
        required: true,
        minlength: [5,"minimum length need to be 6"]
    }

})


module.exports = mongoose.model("Users",userSchema);