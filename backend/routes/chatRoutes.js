const express = require("express")
const { accessChat } = require("../controllers/chatControllers")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

// only logged in users can access this route
router.route('/').post(protect, accessChat)
// router.route('/').get(protect, fetchChats)  // fetch chat for particular user from database
// router.route('/group').post(protect, createGroupChat)  // route for creation of group
// router.route('/rename').put(protect, renameGroup)  // route for renaming the group
// router.route('/groupremove').put(protect, removeFromGroup)  // route for remove someone or leave the group
// router.route('/groupadd').put(protect, addToGroup)  // route for adding someone to the group

module.exports = router;
