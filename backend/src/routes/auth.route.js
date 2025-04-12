const express = require("express");
const authController = require("../controllers/auth.controller");
const middleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup",  authController.signUp);

router.post("/signin", authController.signIn);

router.post("/logout",middleware.authMiddleware, authController.logOut);

router.put('/update-profile', middleware.authMiddleware, authController.updateProfile);
router.get('/check', middleware.authMiddleware, authController.checkAuth);

module.exports = router;
