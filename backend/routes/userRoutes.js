const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');

const router = express.Router()  // instance of router from express

router.route('/').post(registerUser).get(allUsers)
// router.route('/').get(allUsers)  // can be appended to / route
router.route('/login', authUser)


module.exports = router;