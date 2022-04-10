const Users = require('./userModel')
const Payments = require('../payment/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userController = {
    register: async(req, res) => {
        try {
            var pass = "";
            const { name, email, password } = req.body;
            const user = await Users.findOne({ email })
            pass = password;


            if (user)
                return res.status(400).json({ msg: "Email đã có người sử dụng !" })

            if (pass.length < 6)
                return res.status(400).json({ msg: "Mật khẩu phải hơn 6 ký tự!!" })

            //password encrytor
            const passwordHash = await bcrypt.hash(pass, 10)
            const newUser = new Users({
                name,
                email,
                password: passwordHash
            })

            //save mongodb
            await newUser.save()

            //create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id });
            const refreshtoken = createRefreshToken({ id: newUser._id });
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({ accesstoken })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "Email không tồn tại!!" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Mật khẩu không đúng!!" })

            //if login success, create token
            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({ accesstoken })
                // res.json({msg:"login success"})
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;

            if (!rf_token) return res.status(400).json({ msg: "Vui lòng đăng nhập!!" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
                if (err) return res.status(400).json({ msg: "Vui lòng đăng nhập!!" })
                const accesstoken = createAccessToken({ id: data.id })
                res.json({ accesstoken })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getUser: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: "Tài khoản không tồn tại!" })
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addcart: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            if (!user) return res.status(400).json({ msg: "Tài khoản không tồn tại!" });
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })
            return res.json({ msg: "Added to cart" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    history: async(req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id });
            res.json(history);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllUsers: async(req, res) => {
        try {

            const listUser = await Users.find();
            res.json(listUser);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    createUser: async(req, res) => {
        try {
            var pass = "";
            const { name, email, password, role, address } = req.body;
            const user = await Users.findOne({ email })
            pass = password;

            if (user)
                return res.status(400).json({ msg: "Email đã có người sử dụng !" })

            if (pass.length < 6)
                return res.status(400).json({ msg: "Mật khẩu phải hơn 6 ký tự!!" })

            //password encrytor
            const passwordHash = await bcrypt.hash(pass, 10)
            const newUser = new Users({
                name,
                email,
                password: passwordHash,
                role,
                address
            })

            //save mongodb
            await newUser.save()
            return res.json({ msg: "Create success" });

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateUser: async(req, res) => {
        try {
            const { name, email, password, role, address } = req.body;
            const user = await Users.findOne({ email });
            const usercheck = await Users.findById(req.params.id);
            if (user && user.email !== usercheck.email)
                return res.status(400).json({ msg: "Email đã có người sử dụng !" })
            if (password === "") {
                await Users.findByIdAndUpdate({ _id: req.params.id }, { name, email, role })
            } else {
                const pass = password;
                if (pass.length < 6)
                    return res.status(400).json({ msg: "Mật khẩu phải hơn 6 ký tự!!" })

                const passwordHash = await bcrypt.hash(pass, 10)

                await Users.findByIdAndUpdate({ _id: req.params.id }, { name, email, password: passwordHash, role, address })
            }
            res.json({ msg: "update success" });

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteUser: async(req, res) => {
        try {
            if (req.user.id === req.params.id) return res.json({ msg: "Bạn không thể xóa chính mình" })
            await Users.findByIdAndDelete(req.params.id);
            return res.json({ msg: "Xóa thành công user" });

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}
const createAccessToken = (data) => {
    console.log(data);
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
module.exports = userController