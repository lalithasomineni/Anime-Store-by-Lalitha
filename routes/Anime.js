const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");
const multer  = require('multer');
const auth = require('../middlewares/auth');
const app = express();
const path = require("path")
const User = require('../models/User'); // Import your user model

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = path.basename(file.originalname, ext);
        cb(null, `${filename}-${Date.now()}${ext}`);
      },
    });
  var upload = multer({ storage: storage })


router.get("/totalcollection",(req,res)=>{
    Anime.find().then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })
})






router.get("/totalcollection/:id",(req,res)=>{
    Anime.findById(req.params.id).then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })
})
router.post("/additem",auth,upload.single('image'),async (req,res)=>{
    req.body.image = req.file.filename;
    let newItem = new Anime ({
        Type: req.body.Type,
        Name: req.body.Name,
        Description: req.body.Description,
        Price: req.body.Price,
        image : req.body.image
    })
     await newItem.save().then(result=>{
        res.json({"newItem": result});
     }).catch(err=>{
        res.send(err);
     })
})

module.exports = router;
