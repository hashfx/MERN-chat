const express = require('express');
const { registerUser } = require('../controllers/userControllers');

const router = express.Router()  // instance of router from express

router.route('/').post(registerUser)
// router.route('/login', authUser)

module.exports = router;