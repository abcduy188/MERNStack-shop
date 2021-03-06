const router = require('express').Router()
const cateCtrl = require('./categoryProductController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
router.route('/category')
    .get(cateCtrl.getCategories)
    .post(auth, authAdmin, cateCtrl.createCategory)
router.route('/category/delete/:id')
    .delete(auth,authAdmin,cateCtrl.deleteCategory)
router.route('/category/update/:id')
    .put(auth,authAdmin,cateCtrl.updateCategory)
module.exports = router