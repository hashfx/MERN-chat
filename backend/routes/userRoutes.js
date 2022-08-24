const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router()  // instance of router from express

router.route('/').post(registerUser).get(protect, allUsers)  // added protect middleware
// router.route('/').get(allUsers)  // can be appended to / route
router.route('/login', authUser)


module.exports = router;