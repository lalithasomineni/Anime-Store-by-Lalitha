const express = require('express')
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');



router.get("/myorders/:User",auth,(req,res)=>{
    Order.find().where({User:req.params.User}).populate("User",{name:1}).populate("Item",{Name:1}).then(result=>{
       res.send(result);

    }).catch(err=>{
        res.send(err);
    })
})

router.get("/myorders/:_id",auth,(req,res)=>{
 Order.findById(req.params._id).then(result=>{
  res.send(result);
 })
 .catch(err=>{
      res.send(err);
  })
})

router.get("/",auth,(req,res)=>{
  Order.find().then((result)=>res.send(result))
  .catch(err=>{res.send(err)});
})

router.post("/placeorder", auth, async (req, res) => {
    try {
      const { _id: userId } = req.user; // Corrected variable name
  
      const { itemId } = req.body; // Assuming you send itemId in the request body
  
      // Create a new order with the extracted user ID and item ID
      const myOrder = new Order({
        User: userId,
        Item: itemId,
        paymentMethod: req.body.paymentMethod || "COD", // Default payment method
        isPaid: req.body.isPaid || false, // Default payment status
      });
  
      // Save the order to the database
      const result = await myOrder.save();
  
      res.status(200).json(result);
      console.log(result);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while placing the order." });
    }
  });
  
  

router.delete("/deletemyorder/:id",auth,(req,res)=>{
    Order.findByIdAndDelete(req.params.id).then(result=>{
        res.send(" order deleted...")
    }
    ).catch(err=>{
        res.send(err);
    })
})

module.exports = router;