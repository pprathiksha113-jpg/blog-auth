const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { register, login, logout, getProfile } = require("../controllers/authController");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
module.exports = router;
