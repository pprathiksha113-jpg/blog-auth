const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { getMyBlogs, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");

router.use(protect);
router.get("/my", getMyBlogs);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
