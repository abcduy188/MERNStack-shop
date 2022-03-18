const router = require('express').Router()
const prodController = require('../controllers/productController')


router.route('/product')
    .get(prodController.getProducts)
    .post(prodController.createProduct)


router.route('/product/:id')
    .delete(prodController.deleteProduct)
    .put(prodController.updateProduct)
router.route('/product/images/:id')
    .get(prodController.listImages)

    


module.exports = router