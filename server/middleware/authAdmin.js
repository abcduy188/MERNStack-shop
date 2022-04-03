const Users = require('../user/userModel')

const authAdmin = async(req, res, next)=>{
    try {
        //get user info by id
        const user = await Users.findOne({
            _id: req.user.id,
        
        })
        
        if(user.role === 0)
            return res.status(400).json({msg:"Tu choi truy cam admin"})

        next()
    } catch (error) {
        return res.status(500).json({msg: "loi day neee"})
    }
}
module.exports = authAdmin