const router = require('express').Router();
const uploadController = require('./uploadController');
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/upload',auth,authAdmin, uploadController.upload)
router.post('/destroy',auth,authAdmin, uploadController.destroy)

module.exports = router