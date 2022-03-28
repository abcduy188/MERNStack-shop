const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userController.register)
router.post('/createuser', userController.createUser)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh_token', userController.refreshToken)
router.get('/infor', auth, userController.getUser)
router.get('/history', auth, userController.history)
router.patch('/addcart', auth, userController.addcart)
router.get('/allusers',auth,authAdmin, userController.getAllUsers)
router.route('/update/:id')
    .patch(userController.updateUser)
// patch = put ; chi thay doi cac fiel can thay doi 
module.exports = router