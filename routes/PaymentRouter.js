const express = require("express");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const PaymentRouter = express.Router()

PaymentRouter.get("/payments", auth, async (req, res) => {
    try {
        const payments = await Payment.find()
        return res.status(200).json({
            success: true,
            payments
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

PaymentRouter.post("/payment", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("name email")
        if(!user) return res.status(400).json({
            success: false,
            message: "El usuario no existe"
        })

        const {cart, paymentID, address} = req.body
        const {_id, name, email} =user

        const newPayment = new Payment({
            user_id: _id,
            name,
            email,
            cart,
            paymentID,
            address,
        });

        // cart.filter(producto =>{
        //     return sold(producto._id, producto.quantity, producto.sold)
        // });

        await newPayment.save();
        return res.status(200).json({
            success: true,
            message: "Pago realizado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// const sold = async (id, quantity, sold) =>{
//     await Product.findByIdAndUpdate({_id:id},{
//         sold: quantity + sold
//     })
// };


module.exports = PaymentRouter