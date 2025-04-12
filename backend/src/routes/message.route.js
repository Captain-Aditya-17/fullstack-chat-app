const express = require("express");
const messageController = require("../controllers/message.controller"); 
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users",authMiddleware.authMiddleware, messageController.getUsers);
router.get("/:id", authMiddleware.authMiddleware, messageController.getMessages);

router.post('/send/:id', authMiddleware.authMiddleware, messageController.sendMessage);

module.exports = router;