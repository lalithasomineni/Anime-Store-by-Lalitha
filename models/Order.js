const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    User: {type: mongoose.Schema.Types.ObjectId,ref: 'Users',isrequired: true},
    Item: {type: mongoose.Schema.Types.ObjectId,ref: 'Anime',isrequired: true},
    paymentMethod: {type: String,isrequired: true,default: "COD"},
    isPaid: {type:Boolean,isrequired: true,default:false}
     
})


module.exports = mongoose.model("Order",orderSchema);