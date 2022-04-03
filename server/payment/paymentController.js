const Payments = require('./paymentModel');
const Users = require('../user/userModel');
const Products = require('../product/productModel');
var md5 = require('md5');
const paymentController = {

    getPayments: async(req, res)=>{
        try {
            const payments = await Payments.find();
            res.json(payments);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    createPayments: async(req, res)=>{
        try {
            const user = await Users.findById(req.user.id).select('name email');
            if(!user) return res.status(400).json({msg: "Người dùng không tồn tại"});
            console.log("DA nhan order")
            const {cart, address} = req.body;
            const {_id,name,email} = user;
            const d = new Date();
            console.log(d);
            const paymentID = md5(d);
           
            const newPaymant = new Payments({
               paymentID , user_id:_id, name, email,address,cart
            });

            cart.filter(item=>{
                return sold(item._id, item.quantity , item.sold)
            });

            await newPaymant.save();
            console.log("Order oke")
            res.json({msg: "Thanh toán thành công"});
        } catch (error) { 
            
        }
    }
}
const sold = async (id, quantity, solded)=>{
    const soldedd = await Products.findById(id).select('sold');
    console.log("sold product", soldedd);
    await Products.findByIdAndUpdate({_id:id},{
        sold: quantity + solded
    });
}
module.exports = paymentController