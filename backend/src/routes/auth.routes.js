const express = require("express");
const router = express.Router();

const { register, login, me } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);

router.get("/admin-test", protect, allowRoles("admin"), (req, res) => {
  res.json({
    message: "Admin yetkisi başarılı"
  });
});

module.exports = router;