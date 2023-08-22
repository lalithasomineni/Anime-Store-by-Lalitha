const mongoose = require("mongoose");
//const schema = mongoose.Schema();


const animeSchema = new mongoose.Schema({
     Type : {
        type : String,
        required: true
     },
     Name: {
        type: String,
        required: true
     },
     Description: {
        type: String,
        required: true
     },
     Price: {
          type: String,
          required: true
     },
     image: {
        type: String,
        required: true
     }
})


module.exports = mongoose.model("Anime",animeSchema);